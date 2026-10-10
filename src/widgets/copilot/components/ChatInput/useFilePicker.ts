import { useCallback, useEffect, useRef } from "react";

export type FilePickerOptions = {
  accept: string;
  multiple?: boolean;
  capture?: string;
};

// Inline + !important so host rules like `input[type=file] { display: none }`
// cannot hide a light-DOM input. WebKit treats display:none click() as a no-op.
function isolateFileInput(input: HTMLInputElement) {
  const styles: Array<[string, string]> = [
    ["display", "block"],
    ["visibility", "visible"],
    ["position", "fixed"],
    ["top", "-9999px"],
    ["left", "-9999px"],
    ["width", "1px"],
    ["height", "1px"],
    ["opacity", "0"],
    ["overflow", "hidden"],
    ["pointer-events", "none"],
    ["clip", "auto"],
    ["clip-path", "none"],
  ];
  for (const [property, value] of styles) {
    input.style.setProperty(property, value, "important");
  }
}

/**
 * Opens a native file picker from a user gesture.
 *
 * The input is appended to `document.body` (light DOM) and kept there for
 * the life of the hook. That is load-bearing on iOS Safari / WKWebView —
 * including in-app browsers such as X:
 *
 * - A detached `document.createElement("input")` is often collected while
 *   the photo-library or Files sheet is open, so `change` never fires and
 *   the upload never starts.
 * - Camera capture (`capture="environment"`) usually still works because
 *   it returns quickly, which is why "Take Photo" can succeed while
 *   "File" / "Image or Video" fail.
 * - `onchange` assignment is unreliable on iOS; `addEventListener` is not.
 * - `display: none` / `[hidden]` can make `click()` a no-op; keep the node
 *   painted but off-screen.
 *
 * `document.body` is used instead of the widget shadow root because WebKit
 * has historically dropped file-input activations inside shadow trees.
 * Each widget instance owns its own inputs, so multiple embeds stay isolated.
 *
 * Those nodes sit in the host light DOM, so `isolateFileInput` sets hide
 * styles with `!important`. A host `input[type="file"] { display: none }`
 * would otherwise recreate the iOS `click()` no-op.
 */
export function useFilePicker(
  { accept, multiple = false, capture }: FilePickerOptions,
  onFiles: (files: File[]) => void,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onFilesRef = useRef(onFiles);
  onFilesRef.current = onFiles;

  useEffect(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    if (capture) input.capture = capture;
    input.setAttribute("aria-hidden", "true");
    input.tabIndex = -1;
    // Off-screen, painted, and isolated from host `display: none` / `[hidden]`.
    isolateFileInput(input);

    const onChange = () => {
      const files = Array.from(input.files || []);
      if (files.length) onFilesRef.current(files);
    };

    input.addEventListener("change", onChange);
    document.body.appendChild(input);
    inputRef.current = input;

    return () => {
      input.removeEventListener("change", onChange);
      input.remove();
      inputRef.current = null;
    };
  }, [accept, multiple, capture]);

  return useCallback(() => {
    const input = inputRef.current;
    if (!input) return;
    // Reset first so picking the same file twice still fires `change`.
    input.value = "";
    input.click();
  }, []);
}
