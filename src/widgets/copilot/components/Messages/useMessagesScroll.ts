import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MessageMishmash } from "src/contexts/MessagesContext";

const SCROLL_TO_BOTTOM_THRESHOLD_PX = 24;

// Real content end = bottom of the last actual element inside the anchor
function measureRealContentEnd(
  container: HTMLDivElement | null,
  anchor: HTMLDivElement | null,
) {
  const realLast = anchor?.lastElementChild as HTMLElement | null;
  if (!container || !realLast) return null;
  const containerRect = container.getBoundingClientRect();
  const realLastRect = realLast.getBoundingClientRect();
  return realLastRect.bottom - containerRect.top + container.scrollTop;
}

// How much of the container a reader can actually see. The composer floats
// over its bottom edge, and the list keeps that much bottom padding (see
// messages.scss) so the last message can scroll clear of it - so "the bottom"
// of the visible area is the top of that padding, not the container's edge.
// Read from the computed style so this cannot drift from the stylesheet.
function visibleHeight(container: HTMLDivElement) {
  const padding = parseFloat(getComputedStyle(container).paddingBottom) || 0;
  return container.clientHeight - padding;
}

interface UseMessagesScrollArgs {
  messages?: Map<string, MessageMishmash>;
  latestUserId: string | null;
  isMessagesLoading?: boolean;
}

export function useMessagesScroll({
  messages,
  latestUserId,
  isMessagesLoading,
}: UseMessagesScrollArgs) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const lastAnchoredIdRef = useRef<string | null>(null);
  const wasLoadingRef = useRef<boolean>(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Pin the latest user message to the top of the viewport on send / load.
  // this effect only triggers the scroll.
  useLayoutEffect(() => {
    const wasLoading = wasLoadingRef.current;
    wasLoadingRef.current = !!isMessagesLoading;
    if (isMessagesLoading) {
      lastAnchoredIdRef.current = null;
      return;
    }
    if (!latestUserId) return;
    if (latestUserId === lastAnchoredIdRef.current) return;
    lastAnchoredIdRef.current = latestUserId;
    const container = scrollContainerRef.current;
    const anchor = anchorRef.current;
    if (!container || !anchor) return;
    // Scroll only the widget's container — not the host page.
    const top =
      container.scrollTop +
      (anchor.getBoundingClientRect().top - container.getBoundingClientRect().top);
    container.scrollTo({
      top: Math.max(0, top),
      behavior: wasLoading ? "instant" : "smooth",
    });
  }, [latestUserId, isMessagesLoading]);

  const updateBottomButton = useCallback(() => {
    const container = scrollContainerRef.current;
    const realEnd = measureRealContentEnd(container, anchorRef.current);
    if (!container || realEnd === null) {
      setShowScrollToBottom(false);
      return;
    }
    const distance = realEnd - container.scrollTop - visibleHeight(container);
    setShowScrollToBottom(distance > SCROLL_TO_BOTTOM_THRESHOLD_PX);
  }, []);

  // Refresh button as content streams in (discrete reaction to message-map
  useEffect(() => {
    if (isMessagesLoading) return;
    updateBottomButton();
  }, [messages, isMessagesLoading, updateBottomButton]);

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    const realEnd = measureRealContentEnd(container, anchorRef.current);
    if (!container || realEnd === null) return;
    container.scrollTo({
      top: Math.max(0, realEnd - visibleHeight(container)),
      behavior: "smooth",
    });
  };

  return {
    scrollContainerRef,
    anchorRef,
    showScrollToBottom,
    scrollToBottom,
    handleScroll: updateBottomButton,
  };
}
