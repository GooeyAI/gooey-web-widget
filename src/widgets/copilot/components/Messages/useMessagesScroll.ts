import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

function measureAnchorTop(container: HTMLDivElement, anchor: HTMLDivElement) {
  return (
    container.scrollTop +
    (anchor.getBoundingClientRect().top - container.getBoundingClientRect().top)
  );
}

interface UseMessagesScrollArgs {
  messages?: Map<string, MessageMishmash>;
  latestUserId: string | null;
  isMessagesLoading?: boolean;
  isStreaming?: boolean;
}

export function useMessagesScroll({
  messages,
  latestUserId,
  isMessagesLoading,
  isStreaming,
}: UseMessagesScrollArgs) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const lastAnchoredIdRef = useRef<string | null>(null);
  const wasLoadingRef = useRef<boolean>(true);
  // Whether the list tracks a streaming reply. Only the reader scrolling up
  // turns it off; reaching the bottom turns it on.
  const isFollowingRef = useRef(true);
  const lastScrollTopRef = useRef(0);
  const lastScrollHeightRef = useRef(0);
  const wasStreamingRef = useRef(false);
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
    isFollowingRef.current = true;
    const container = scrollContainerRef.current;
    const anchor = anchorRef.current;
    if (!container || !anchor) return;
    // Scroll only the widget's container — not the host page.
    container.scrollTo({
      top: Math.max(0, measureAnchorTop(container, anchor)),
      behavior: wasLoading ? "instant" : "smooth",
    });
  }, [latestUserId, isMessagesLoading]);

  // Once the reply outgrows the space below the pinned user message, keep its
  // end in view: the answer scrolls up out of sight and the status line stays
  // at the bottom. Never scrolls above the pinned position, so it cannot fight
  // the send scroll above, and never scrolls up. Also runs on the render that
  // ends the stream, where the action row replaces the status line.
  useLayoutEffect(() => {
    const justEnded = wasStreamingRef.current && !isStreaming;
    wasStreamingRef.current = !!isStreaming;
    if (isMessagesLoading || !isFollowingRef.current) return;
    if (!isStreaming && !justEnded) return;
    const container = scrollContainerRef.current;
    const anchor = anchorRef.current;
    const realEnd = measureRealContentEnd(container, anchor);
    if (!container || !anchor || realEnd === null) return;
    const target = realEnd - container.clientHeight;
    if (target <= measureAnchorTop(container, anchor)) return;
    if (target <= container.scrollTop + 1) return;
    container.scrollTop = target;
    lastScrollTopRef.current = container.scrollTop;
    lastScrollHeightRef.current = container.scrollHeight;
  }, [messages, isStreaming, isMessagesLoading]);

  const updateBottomButton = useCallback(() => {
    const container = scrollContainerRef.current;
    const realEnd = measureRealContentEnd(container, anchorRef.current);
    if (!container || realEnd === null) {
      setShowScrollToBottom(false);
      return;
    }
    const distance = realEnd - container.scrollTop - container.clientHeight;
    // Only once the reader has scrolled away: following is on until they do,
    // so content running below the fold never raises it by itself.
    setShowScrollToBottom(
      !isFollowingRef.current && distance > SCROLL_TO_BOTTOM_THRESHOLD_PX,
    );
  }, []);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    const realEnd = measureRealContentEnd(container, anchorRef.current);
    if (container && realEnd !== null) {
      const { scrollTop, scrollHeight } = container;
      const distance = realEnd - scrollTop - container.clientHeight;
      // Up without the content shrinking: when content shrinks the browser
      // clamps scrollTop itself, which is not the reader leaving.
      const readerScrolledUp =
        scrollTop < lastScrollTopRef.current - 1 &&
        scrollHeight >= lastScrollHeightRef.current;
      if (distance <= SCROLL_TO_BOTTOM_THRESHOLD_PX) {
        isFollowingRef.current = true;
      } else if (readerScrolledUp) {
        isFollowingRef.current = false;
      }
      lastScrollTopRef.current = scrollTop;
      lastScrollHeightRef.current = scrollHeight;
    }
    updateBottomButton();
  };

  // Refresh button as content streams in (discrete reaction to message-map
  useEffect(() => {
    if (isMessagesLoading) return;
    updateBottomButton();
  }, [messages, isMessagesLoading, updateBottomButton]);

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    const realEnd = measureRealContentEnd(container, anchorRef.current);
    if (!container || realEnd === null) return;
    isFollowingRef.current = true;
    container.scrollTo({
      top: Math.max(0, realEnd - container.clientHeight),
      behavior: "smooth",
    });
    updateBottomButton();
  };

  return {
    scrollContainerRef,
    anchorRef,
    showScrollToBottom,
    scrollToBottom,
    handleScroll,
  };
}
