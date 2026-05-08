import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MessageMishmash } from "src/contexts/MessagesContext";

const SCROLL_TO_BOTTOM_THRESHOLD_PX = 24;
const SCROLL_MARGIN_TOP_PX = 16;
const LATEST_USER_SELECTOR = '[data-gooey-latest-user-message="true"]';
const ANCHOR_GAP_VAR = "--gooey-anchor-gap";

interface UseMessagesScrollArgs {
  messages?: Map<string, MessageMishmash>;
  isMessagesLoading?: boolean;
}

type AnchorMode = "send" | "load" | null;

export function useMessagesScroll({
  messages,
  isMessagesLoading,
}: UseMessagesScrollArgs) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);
  const lastAnchoredIdRef = useRef<string | null>(null);
  const anchorModeRef = useRef<AnchorMode>(null);
  const wasLoadingRef = useRef<boolean>(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const latestUserMessageId = useMemo(() => {
    if (!messages || messages.size === 0) return null;
    let last: string | null = null;
    messages.forEach((msg, id) => {
      if (msg.role === "user") last = id;
    });
    return last;
  }, [messages]);

  const setAnchorGap = useCallback((px: number) => {
    const content = scrollContentRef.current;
    if (!content) return;
    content.style.setProperty(ANCHOR_GAP_VAR, `${px}px`);
  }, []);

  const computeAnchorGap = useCallback(() => {
    const container = scrollContainerRef.current;
    const content = scrollContentRef.current;
    if (!container || !content) return;
    // Only "send" mode adds a gap so the user msg can pin to the top while
    // the assistant streams below it. "load" / null modes leave the layout
    // alone — the user msg just needs to be in view.
    if (anchorModeRef.current !== "send") {
      setAnchorGap(0);
      return;
    }
    const target = content.querySelector<HTMLElement>(LATEST_USER_SELECTOR);
    if (!target) {
      setAnchorGap(0);
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const userMsgTopY =
      targetRect.top - containerRect.top + container.scrollTop;
    const viewportH = container.clientHeight;
    const currentGap =
      parseFloat(content.style.getPropertyValue(ANCHOR_GAP_VAR)) || 0;
    const naturalScrollHeight = container.scrollHeight - currentGap;
    const requiredGap = Math.max(
      0,
      userMsgTopY - SCROLL_MARGIN_TOP_PX + viewportH - naturalScrollHeight,
    );
    setAnchorGap(requiredGap);
  }, [setAnchorGap]);

  // The "real" content end is below the last real message but above the
  // anchor gap. The bottom button + its target both measure against this,
  // so an empty anchor gap doesn't trick us into thinking there's more
  // content below.
  const getRealContentEnd = useCallback(() => {
    const container = scrollContainerRef.current;
    const content = scrollContentRef.current;
    if (!container || !content) return null;
    const currentGap =
      parseFloat(content.style.getPropertyValue(ANCHOR_GAP_VAR)) || 0;
    return container.scrollHeight - currentGap;
  }, []);

  const updateBottomButton = useCallback(() => {
    const container = scrollContainerRef.current;
    const realEnd = getRealContentEnd();
    if (!container || realEnd === null) {
      setShowScrollToBottom(false);
      return;
    }
    const distance = realEnd - container.scrollTop - container.clientHeight;
    setShowScrollToBottom(distance > SCROLL_TO_BOTTOM_THRESHOLD_PX);
  }, [getRealContentEnd]);

  const handleScrollContainerScroll = useCallback(() => {
    updateBottomButton();
  }, [updateBottomButton]);

  const scrollToBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const realEnd = getRealContentEnd() ?? container.scrollHeight;
    container.scrollTo({
      top: Math.max(0, realEnd - container.clientHeight),
      behavior: "smooth",
    });
  }, [getRealContentEnd]);

  // Anchor latest user message on send / conversation load.
  //  - send (latest user id changed mid-session): pin user msg at top, add
  //    a bottom gap so streaming reply has room beneath it.
  //  - load (transition out of isMessagesLoading): just bring user msg into
  //    view; no gap, no forced top-pin.
  // Loading=true invalidates the anchored id so a re-load (or switch back
  // to the same conversation) re-anchors when loading flips false.
  useEffect(() => {
    const wasLoading = wasLoadingRef.current;
    wasLoadingRef.current = !!isMessagesLoading;

    if (isMessagesLoading) {
      lastAnchoredIdRef.current = null;
      return;
    }
    if (!latestUserMessageId) {
      anchorModeRef.current = null;
      setAnchorGap(0);
      return;
    }
    if (latestUserMessageId === lastAnchoredIdRef.current) return;
    lastAnchoredIdRef.current = latestUserMessageId;
    anchorModeRef.current = wasLoading ? "load" : "send";

    let raf2: number | null = null;
    const raf1 = requestAnimationFrame(() => {
      computeAnchorGap();
      raf2 = requestAnimationFrame(() => {
        const target = scrollContentRef.current?.querySelector<HTMLElement>(
          LATEST_USER_SELECTOR,
        );
        const isLoad = anchorModeRef.current === "load";
        target?.scrollIntoView({
          behavior: isLoad ? "instant" : "smooth",
          block: "start",
        });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
    };
  }, [latestUserMessageId, isMessagesLoading, computeAnchorGap, setAnchorGap]);

  // Recompute gap + bottom button when viewport or content geometry changes.
  useEffect(() => {
    if (isMessagesLoading) return;
    const container = scrollContainerRef.current;
    const content = scrollContentRef.current;
    if (!container || !content) return;
    const onChange = () => {
      computeAnchorGap();
      updateBottomButton();
    };
    const observer = new ResizeObserver(onChange);
    observer.observe(container);
    observer.observe(content);
    return () => observer.disconnect();
  }, [isMessagesLoading, computeAnchorGap, updateBottomButton]);

  return {
    scrollContainerRef,
    scrollContentRef,
    showScrollToBottom,
    scrollToBottom,
    handleScrollContainerScroll,
  };
}
