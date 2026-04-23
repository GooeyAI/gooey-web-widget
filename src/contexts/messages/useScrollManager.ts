import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollManager = (isMessagesLoading: boolean) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isAtBottomRef = useRef(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollMessageContainer = useCallback(
    (y: number = 0) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scroll({
          top: y,
          behavior: "smooth",
        });
      }
    },
    [],
  );

  const scrollToBottom = useCallback(() => {
    isAtBottomRef.current = true;
    scrollMessageContainer(
      scrollContainerRef?.current?.scrollHeight as number,
    );
  }, [scrollMessageContainer]);

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

  // Scroll to bottom on mount and conversation switch
  useEffect(() => {
    isAtBottomRef.current = true;
    setShowScrollToBottom(false);
    requestAnimationFrame(() => scrollToBottom());
  }, [scrollToBottom, isMessagesLoading]);

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
    return () => observer.disconnect();
  }, [checkScrollPosition, isMessagesLoading]);

  return {
    scrollContainerRef,
    scrollMessageContainer,
    scrollToBottom,
    showScrollToBottom,
    handleScrollContainerScroll,
  };
};
