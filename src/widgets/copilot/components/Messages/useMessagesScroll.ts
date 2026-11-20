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
  // Whether the list tracks a streaming reply. Each reply starts with it on.
  // Only the reader scrolling up turns it off; reaching the bottom turns it on.
  const isFollowingRef = useRef(true);
  // Where the last scroll event left the list. A scroll event does not say who
  // moved it; these are how a move up is told to be the reader's.
  const lastScrollTopRef = useRef(0);
  const lastScrollHeightRef = useRef(0);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // While messages load the list is not rendered, so the helpers below find no
  // container and do nothing.

  // Our own instant scrolls go through here and record where they leave the
  // list. The browser does not reliably fire a scroll event for a programmatic
  // scroll, and the reader's next scroll is measured from this point.
  const scrollListTo = (container: HTMLDivElement, top: number) => {
    container.scrollTop = top;
    lastScrollTopRef.current = container.scrollTop;
    lastScrollHeightRef.current = container.scrollHeight;
  };

  // Bring the latest question to the top. Scrolls the widget's list only, not
  // the host page.
  const pinLatestQuestion = (behavior: ScrollBehavior) => {
    const container = scrollContainerRef.current;
    const anchor = anchorRef.current;
    if (!container || !anchor) return;
    isFollowingRef.current = true;
    container.scrollTo({
      top: Math.max(0, measureAnchorTop(container, anchor)),
      behavior,
    });
  };

  // Once the reply outgrows the space below its question, keep its end in
  // view: the answer scrolls up out of sight and the status line stays at the
  // bottom. Never scrolls up, nor above the question, so it cannot fight a pin.
  const followReplyEnd = () => {
    const container = scrollContainerRef.current;
    const anchor = anchorRef.current;
    const realEnd = measureRealContentEnd(container, anchor);
    if (!isFollowingRef.current || !container || !anchor || realEnd === null) {
      return;
    }
    const target = realEnd - container.clientHeight;
    if (target <= measureAnchorTop(container, anchor)) return;
    if (target <= container.scrollTop + 1) return;
    scrollListTo(container, target);
  };

  // A conversation finished loading: its last question goes to the top at once.
  useLayoutEffect(() => {
    if (!isMessagesLoading) pinLatestQuestion("instant");
  }, [isMessagesLoading]);

  // A new question: it glides to the top.
  useLayoutEffect(() => {
    pinLatestQuestion("smooth");
  }, [latestUserId]);

  // A reply's lifetime. Starting turns following back on, whatever the reader
  // did during the last one: a re-run or an edit keeps its question, so no pin
  // fires for it. The cleanup runs as it ends, for one last pass while the
  // action row replaces the status line.
  useLayoutEffect(() => {
    if (!isStreaming) return;
    isFollowingRef.current = true;
    return followReplyEnd;
  }, [isStreaming]);

  useLayoutEffect(() => {
    if (isStreaming) followReplyEnd();
  }, [messages]);

  const distanceToEnd = () => {
    const container = scrollContainerRef.current;
    const realEnd = measureRealContentEnd(container, anchorRef.current);
    if (!container || realEnd === null) return null;
    return realEnd - container.scrollTop - container.clientHeight;
  };

  // Only once the reader has scrolled away: following is on until they do, so
  // content running below the fold never raises it by itself.
  const updateBottomButton = (distance: number | null) =>
    setShowScrollToBottom(
      !isFollowingRef.current &&
        distance !== null &&
        distance > SCROLL_TO_BOTTOM_THRESHOLD_PX,
    );

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    const distance = distanceToEnd();
    if (container && distance !== null) {
      const { scrollTop, scrollHeight } = container;
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
    updateBottomButton(distance);
  };

  // Content arriving can push the end below the fold while the reader is away.
  useEffect(() => {
    updateBottomButton(distanceToEnd());
  }, [messages, isMessagesLoading]);

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    const distance = distanceToEnd();
    if (!container || distance === null) return;
    isFollowingRef.current = true;
    // Instant: a smooth scroll down a long reply lags, and while a reply
    // streams the follow sets scrollTop each chunk and cuts it short anyway.
    scrollListTo(container, container.scrollTop + distance);
    setShowScrollToBottom(false);
  };

  // Bring the end of `target` into view once it has grown below the fold (a
  // dropdown opening), but never push `keep`, the line the reader clicked,
  // above the top. Only scrolls down.
  const revealInList = useCallback((target: Element, keep: Element) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { top, bottom } = container.getBoundingClientRect();
    const hidden = target.getBoundingClientRect().bottom - bottom;
    const room = keep.getBoundingClientRect().top - top;
    const by = Math.min(hidden, room);
    // Instant, like the scroll-down button: while a reply streams the follow
    // sets scrollTop on every chunk and would cut a smooth scroll short.
    if (by > 0) scrollListTo(container, container.scrollTop + by);
  }, []);

  return {
    scrollContainerRef,
    anchorRef,
    showScrollToBottom,
    scrollToBottom,
    handleScroll,
    revealInList,
  };
}
