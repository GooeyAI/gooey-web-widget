import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollManager = (
  isMessagesLoading: boolean,
  latestUserMsgId?: string,
) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Spacer is sized only after a new user message is detected.
  // On conversation load it stays at its natural 0 height.
  const isInSendCycleRef = useRef(false);
  const lastSeenUserMsgIdRef = useRef<string | undefined>(latestUserMsgId);
  const timersRef = useRef({
    showButton: null as number | null,
    scrollThrottle: null as number | null,
    mutationThrottle: null as number | null,
  });

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scroll({ top: el.scrollHeight, behavior });
  }, []);

  const findUserMsg = useCallback((id: string | undefined) => {
    const el = scrollContainerRef.current;
    if (!el || !id) return null;
    return el.querySelector<HTMLElement>(`[id="${id}"]`);
  }, []);

  const scrollToUserMsg = useCallback(
    (id: string | undefined, behavior: ScrollBehavior = "instant") => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const target = findUserMsg(id);
      if (!target) {
        el.scrollTop = 0;
        return;
      }
      const containerRect = el.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      el.scroll({
        top: el.scrollTop + (targetRect.top - containerRect.top),
        behavior,
      });
    },
    [findUserMsg],
  );

  const recomputeSpacerHeight = useCallback(
    (id: string | undefined) => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const spacer = el.querySelector<HTMLElement>(".gooey-scroll-spacer");
      if (!spacer) return;
      const target = findUserMsg(id);
      if (!target) {
        spacer.style.height = "0px";
        return;
      }
      // Height of all real content from the top of the latest user message
      // down to the start of the spacer.
      const distance =
        spacer.getBoundingClientRect().top - target.getBoundingClientRect().top;
      spacer.style.height = `${Math.max(0, el.clientHeight - distance)}px`;
    },
    [findUserMsg],
  );

  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const t = timersRef.current;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    if (atBottom) {
      if (t.showButton) {
        clearTimeout(t.showButton);
        t.showButton = null;
      }
      setShowScrollToBottom(false);
    } else if (!t.showButton) {
      t.showButton = window.setTimeout(() => {
        t.showButton = null;
        setShowScrollToBottom(true);
      }, 300);
    }
  }, []);

  const handleScrollContainerScroll = useCallback(() => {
    const t = timersRef.current;
    if (t.scrollThrottle) return;
    t.scrollThrottle = window.setTimeout(() => {
      t.scrollThrottle = null;
      checkScrollPosition();
    }, 100);
  }, [checkScrollPosition]);

  // Conversation load: anchor at top instantly, hide button, drop spacer cycle.
  // latestUserMsgId is intentionally not a dep — load only fires on isMessagesLoading.
  useEffect(() => {
    setShowScrollToBottom(false);
    isInSendCycleRef.current = false;
    lastSeenUserMsgIdRef.current = latestUserMsgId;
    requestAnimationFrame(() => scrollToUserMsg(latestUserMsgId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMessagesLoading, scrollToUserMsg]);

  // New send: latestUserMsgId changed and wasn't just absorbed by the load effect.
  useEffect(() => {
    if (latestUserMsgId === lastSeenUserMsgIdRef.current) return;
    lastSeenUserMsgIdRef.current = latestUserMsgId;
    if (!latestUserMsgId) return;
    isInSendCycleRef.current = true;
    requestAnimationFrame(() => {
      recomputeSpacerHeight(latestUserMsgId);
      scrollToUserMsg(latestUserMsgId, "smooth");
    });
  }, [latestUserMsgId, recomputeSpacerHeight, scrollToUserMsg]);

  // Watch container content changes (streaming response) to keep spacer sized
  // and the scroll-to-bottom button correct.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      const t = timersRef.current;
      if (t.mutationThrottle) return;
      t.mutationThrottle = window.setTimeout(() => {
        t.mutationThrottle = null;
        if (isInSendCycleRef.current) {
          recomputeSpacerHeight(lastSeenUserMsgIdRef.current);
        }
        checkScrollPosition();
      }, 100);
    });
    observer.observe(el, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      const t = timersRef.current;
      if (t.mutationThrottle) {
        clearTimeout(t.mutationThrottle);
        t.mutationThrottle = null;
      }
    };
  }, [checkScrollPosition, recomputeSpacerHeight, isMessagesLoading]);

  // Container resize during cycle.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (isInSendCycleRef.current) {
        recomputeSpacerHeight(lastSeenUserMsgIdRef.current);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [recomputeSpacerHeight, isMessagesLoading]);

  // Clear standalone (non-effect-owned) timers on unmount.
  useEffect(
    () => () => {
      const t = timersRef.current;
      if (t.showButton) clearTimeout(t.showButton);
      if (t.scrollThrottle) clearTimeout(t.scrollThrottle);
    },
    [],
  );

  return {
    scrollContainerRef,
    scrollToBottom,
    showScrollToBottom,
    handleScrollContainerScroll,
  };
};
