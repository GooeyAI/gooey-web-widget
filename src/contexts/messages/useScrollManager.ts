import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollManager = (isMessagesLoading: boolean) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isAtBottomRef = useRef(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

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

  const scrollToLatestUserMessage = useCallback(() => {
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
    el.scrollTop += targetRect.top - containerRect.top;
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

  // Anchor the latest user message at the top of the viewport on load
  useEffect(() => {
    isAtBottomRef.current = true;
    setShowScrollToBottom(false);
    requestAnimationFrame(() => scrollToLatestUserMessage());
  }, [scrollToLatestUserMessage, isMessagesLoading]);

  // Detect content growth via MutationObserver
  const mutationThrottleRef = useRef<number | null>(null);
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      if (mutationThrottleRef.current) return;
      mutationThrottleRef.current = window.setTimeout(() => {
        mutationThrottleRef.current = null;
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
  }, [checkScrollPosition, isMessagesLoading]);

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
