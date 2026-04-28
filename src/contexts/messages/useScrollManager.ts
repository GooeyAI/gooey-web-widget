import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollManager = (
  isMessagesLoading: boolean,
  isSending: boolean,
  isReceiving: boolean,
) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isAtBottomRef = useRef(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Tracks whether we're inside an active send/receive cycle.
  // The spacer is only sized during this window; on conversation load it stays at its natural 0 height.
  const isInSendCycleRef = useRef(false);
  useEffect(() => {
    isInSendCycleRef.current = isSending || isReceiving;
  }, [isSending, isReceiving]);

  const scrollMessageContainer = useCallback(
    (y: number = 0, behavior: "smooth" | "instant" = "smooth") => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scroll({
          top: y,
          behavior,
        });
      }
    },
    [],
  );

  const scrollToBottom = useCallback(
    (behavior: "smooth" | "instant" = "smooth") => {
      isAtBottomRef.current = true;
      scrollMessageContainer(
        scrollContainerRef?.current?.scrollHeight as number,
        behavior,
      );
    },
    [scrollMessageContainer],
  );

  const scrollToLatestUserMessage = useCallback(
    (behavior: ScrollBehavior = "instant") => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const userMessages = el.querySelectorAll<HTMLElement>(".gooey-outgoingMsg");
      const last = userMessages[userMessages.length - 1];
      if (!last) {
        el.scrollTop = 0;
        return;
      }
      const containerRect = el.getBoundingClientRect();
      const targetRect = last.getBoundingClientRect();
      const targetScrollTop =
        el.scrollTop + (targetRect.top - containerRect.top);
      el.scroll({ top: targetScrollTop, behavior });
    },
    [],
  );

  const recomputeSpacerHeight = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const spacer = el.querySelector<HTMLElement>(".gooey-scroll-spacer");
    if (!spacer) return;
    const userMessages = el.querySelectorAll<HTMLElement>(".gooey-outgoingMsg");
    const last = userMessages[userMessages.length - 1];
    if (!last) {
      spacer.style.height = "0px";
      return;
    }
    // Distance from the top of the latest user message to the top of the spacer
    // = height of all real content from the user message down to the bottom.
    const distance =
      spacer.getBoundingClientRect().top - last.getBoundingClientRect().top;
    const newHeight = Math.max(0, el.clientHeight - distance);
    spacer.style.height = `${newHeight}px`;
  }, []);

  const showButtonTimerRef = useRef<number | null>(null);
  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    isAtBottomRef.current = atBottom;
    if (atBottom) {
      if (showButtonTimerRef.current) {
        clearTimeout(showButtonTimerRef.current);
        showButtonTimerRef.current = null;
      }
      setShowScrollToBottom(false);
    } else if (!showButtonTimerRef.current) {
      showButtonTimerRef.current = window.setTimeout(() => {
        showButtonTimerRef.current = null;
        setShowScrollToBottom(true);
      }, 300);
    }
  }, []);

  const scrollThrottleRef = useRef<number | null>(null);
  const handleScrollContainerScroll = useCallback(() => {
    if (scrollThrottleRef.current) return;
    scrollThrottleRef.current = window.setTimeout(() => {
      scrollThrottleRef.current = null;
      checkScrollPosition();
    }, 100);
  }, [checkScrollPosition]);

  // Anchor the latest user message at the top of the viewport on load.
  // Spacer is intentionally not recomputed here — load shows the conversation as-is.
  useEffect(() => {
    isAtBottomRef.current = true;
    setShowScrollToBottom(false);
    requestAnimationFrame(() => scrollToLatestUserMessage());
  }, [scrollToLatestUserMessage, isMessagesLoading]);

  // Anchor the latest user message when a new send begins (smooth)
  useEffect(() => {
    if (!isSending) return;
    requestAnimationFrame(() => {
      recomputeSpacerHeight();
      scrollToLatestUserMessage("smooth");
    });
  }, [isSending, recomputeSpacerHeight, scrollToLatestUserMessage]);

  // Detect content growth via MutationObserver.
  // During an active send/receive cycle, also reshrink the spacer as the response streams.
  const mutationThrottleRef = useRef<number | null>(null);
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      if (mutationThrottleRef.current) return;
      mutationThrottleRef.current = window.setTimeout(() => {
        mutationThrottleRef.current = null;
        if (isInSendCycleRef.current) recomputeSpacerHeight();
        checkScrollPosition();
      }, 100);
    });
    observer.observe(el, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (mutationThrottleRef.current) {
        clearTimeout(mutationThrottleRef.current);
        mutationThrottleRef.current = null;
      }
    };
  }, [checkScrollPosition, recomputeSpacerHeight, isMessagesLoading]);

  // Recompute spacer on container resize, but only while in an active send/receive cycle.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (isInSendCycleRef.current) recomputeSpacerHeight();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [recomputeSpacerHeight, isMessagesLoading]);

  // Clear all pending timers on unmount
  useEffect(() => {
    return () => {
      if (showButtonTimerRef.current) {
        clearTimeout(showButtonTimerRef.current);
        showButtonTimerRef.current = null;
      }
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
        scrollThrottleRef.current = null;
      }
      if (mutationThrottleRef.current) {
        clearTimeout(mutationThrottleRef.current);
        mutationThrottleRef.current = null;
      }
    };
  }, []);

  return {
    scrollContainerRef,
    scrollMessageContainer,
    scrollToBottom,
    showScrollToBottom,
    handleScrollContainerScroll,
  };
};
