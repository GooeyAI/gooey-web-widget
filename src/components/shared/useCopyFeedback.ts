import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks a transient "copied" state for copy-to-clipboard buttons. Call
 * `signalCopied()` after a successful copy to flip `copied` to true; it resets
 * automatically after `resetMs`. The pending timer is cleared on unmount and on
 * repeat copies so the state never lingers or resets early.
 */
export function useCopyFeedback(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const signalCopied = useCallback(() => {
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), resetMs);
  }, [resetMs]);

  return { copied, signalCopied };
}

export default useCopyFeedback;
