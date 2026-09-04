import { useEffect, useState } from "react";
import { formatRunTime } from "./helpers";
import { MetaLabel } from "./MessageTime";

// Fast enough that the tenths move smoothly, slow enough to stay cheap.
const TICK_MS = 100;

/**
 * Times a response in the browser while it streams.
 *
 * `startedAt` is pinned when a message starts streaming and `measuredSec` is
 * frozen when it stops, so the pair only ever describes a response the viewer
 * actually watched arrive. A message that was already final on its first
 * render — loaded from history, or handed over finished by a host controller —
 * reports null for both, leaving whatever duration the backend sent as the
 * only value on offer.
 *
 * The measurement is deliberately not persisted. It describes this viewing of
 * the message, not the run; the run's own figure is the backend's to report.
 */
export function useStreamTimer(isStreaming: boolean): TimerState {
  const [state, setState] = useState<TimerState>(() => startState(isStreaming));

  // Both edges are handled, not just the first: a message slot can be handed a
  // fresh streaming message (controller ids are positional, so React reuses
  // the instance), and that must restart the clock rather than report the
  // previous occupant's duration.
  if (state.isStreaming !== isStreaming) {
    setState(isStreaming ? startState(true) : stopState(state));
  }

  return state;
}

type TimerState = {
  isStreaming: boolean;
  startedAt: number | null;
  measuredSec: number | null;
};

const startState = (isStreaming: boolean): TimerState => ({
  isStreaming,
  startedAt: isStreaming ? performance.now() : null,
  measuredSec: null,
});

const stopState = (state: TimerState): TimerState => ({
  isStreaming: false,
  startedAt: state.startedAt,
  measuredSec:
    state.startedAt === null
      ? null
      : (performance.now() - state.startedAt) / 1000,
});

/**
 * The live half of the timer. It owns its own tick so that ten updates a
 * second re-render this label alone and not the message around it, which would
 * otherwise re-parse the response markdown on every frame.
 */
export function StreamTimerLabel({
  startedAt,
  className,
}: {
  startedAt: number;
  className?: string;
}) {
  const [elapsedSec, setElapsedSec] = useState(
    () => (performance.now() - startedAt) / 1000,
  );

  useEffect(() => {
    const id = setInterval(
      () => setElapsedSec((performance.now() - startedAt) / 1000),
      TICK_MS,
    );
    return () => clearInterval(id);
  }, [startedAt]);

  return (
    <MetaLabel className={className}>{formatRunTime(elapsedSec)}</MetaLabel>
  );
}