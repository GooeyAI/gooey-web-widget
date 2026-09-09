import { useState } from "react";

/**
 * Times a response in the browser while it streams.
 *
 * Nothing ticks on screen while it does. This measures only so that a finished
 * response has a duration to report where the backend sent none; a counter
 * climbing beside an answer that has not arrived reads as an apology, and is
 * the last thing a visitor to a customer's site needs to watch.
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
