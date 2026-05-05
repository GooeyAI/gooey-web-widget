import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const LATEST_USER_MSG_SELECTOR = '[data-gooey-latest-user-message="true"]';

type Timers = {
  showButton: number | null;
  scrollThrottle: number | null;
};

const findLatestUserMsg = (container: HTMLElement | null) => {
  if (!container) return null;
  return container.querySelector<HTMLElement>(LATEST_USER_MSG_SELECTOR);
};

const scrollToUserMsg = (
  container: HTMLElement | null,
  target: HTMLElement | null,
  behavior: ScrollBehavior = "instant",
) => {
  if (!container) return;
  if (!target) {
    container.scrollTop = 0;
    return;
  }
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  container.scroll({
    top: container.scrollTop + (targetRect.top - containerRect.top),
    behavior,
  });
};

const recomputeSpacerHeight = (
  container: HTMLElement | null,
  target: HTMLElement | null,
) => {
  if (!container) return;
  const spacer = container.querySelector<HTMLElement>(".gooey-scroll-spacer");
  if (!spacer) return;
  if (!target) {
    spacer.style.height = "0px";
    return;
  }
  const distance =
    spacer.getBoundingClientRect().top - target.getBoundingClientRect().top;
  spacer.style.height = `${Math.max(0, container.clientHeight - distance)}px`;
};

const checkScrollPosition = (
  container: HTMLElement | null,
  timers: Timers,
  setShowScrollToBottom: (v: boolean) => void,
) => {
  if (!container) return;
  const atBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight < 50;
  if (atBottom) {
    if (timers.showButton) {
      clearTimeout(timers.showButton);
      timers.showButton = null;
    }
    setShowScrollToBottom(false);
  } else if (!timers.showButton) {
    timers.showButton = window.setTimeout(() => {
      timers.showButton = null;
      setShowScrollToBottom(true);
    }, 300);
  }
};

export const useScrollManager = (isMessagesLoading: boolean) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const isInSendCycleRef = useRef(false);
  const latestUserMsgRef = useRef<HTMLElement | null>(null);
  const wasMessagesLoadingRef = useRef(isMessagesLoading);
  const timersRef = useRef<Timers>({
    showButton: null,
    scrollThrottle: null,
  });

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scroll({ top: el.scrollHeight, behavior });
  }, []);

  const handleScrollContainerScroll = useCallback(() => {
    const t = timersRef.current;
    if (t.scrollThrottle) return;
    t.scrollThrottle = window.setTimeout(() => {
      t.scrollThrottle = null;
      checkScrollPosition(
        scrollContainerRef.current,
        timersRef.current,
        setShowScrollToBottom,
      );
    }, 100);
  }, []);

  // Single render-driven sync.
  // - On isMessagesLoading falling edge: anchor instantly, sync marker ref, no send cycle.
  // - When the marker element identity changes (renderer mounted a new latest user bubble): smooth-scroll spacer cycle.
  // - Otherwise (e.g. streaming chunks growing the assistant reply): keep spacer + button state in sync.
  useLayoutEffect(() => {
    const justLoaded =
      wasMessagesLoadingRef.current && !isMessagesLoading;
    wasMessagesLoadingRef.current = isMessagesLoading;
    if (isMessagesLoading) return;

    const container = scrollContainerRef.current;
    const target = findLatestUserMsg(container);

    if (justLoaded) {
      latestUserMsgRef.current = target;
      isInSendCycleRef.current = false;
      setShowScrollToBottom(false);
      requestAnimationFrame(() =>
        scrollToUserMsg(container, target, "instant"),
      );
      return;
    }

    if (target !== latestUserMsgRef.current) {
      latestUserMsgRef.current = target;
      if (target) {
        isInSendCycleRef.current = true;
        requestAnimationFrame(() => {
          recomputeSpacerHeight(container, target);
          scrollToUserMsg(container, target, "smooth");
        });
      } else {
        isInSendCycleRef.current = false;
      }
      return;
    }

    if (isInSendCycleRef.current) {
      recomputeSpacerHeight(container, target);
    }
    checkScrollPosition(container, timersRef.current, setShowScrollToBottom);
  });

  // Container resize during a send cycle.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (isInSendCycleRef.current) {
        recomputeSpacerHeight(el, latestUserMsgRef.current);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMessagesLoading]);

  // Clear standalone timers on unmount.
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
