import { useLayoutEffect, useState } from "react";

/**
 * Emission order decides the cascade between rules of equal specificity, so it
 * is declared here rather than left to module evaluation order — which is
 * import-graph and bundler determined, and silently reorderable by an unrelated
 * refactor.
 *
 * - `component`: per-component stylesheets, registered at module scope.
 * - `utility`:   root.scss (spacing/sizing/flex/colour utilities and the reset).
 *                Emitted after components on purpose: this codebase is
 *                utility-first, so `gpl-8` on an element is meant to win over a
 *                component rule of equal specificity.
 * - `theme`:     theme stylesheets, which must be able to override both.
 *
 * This is the order the code already relied on; naming it just stops it being
 * a coincidence of where the imports happen to sit.
 */
export const STYLE_LAYERS = ["component", "utility", "theme"] as const;

export type StyleLayer = (typeof STYLE_LAYERS)[number];

declare global {
  var addedStyles: Map<string, StyleLayer>;
}

const registry = (): Map<string, StyleLayer> =>
  (globalThis.addedStyles ??= new Map());

const cssText = (): string => {
  const styles = registry();
  return STYLE_LAYERS.flatMap((layer) =>
    Array.from(styles.entries())
      .filter(([, entryLayer]) => entryLayer === layer)
      .map(([style]) => style),
  ).join("\n");
};

export function addInlineStyle(style: string, layer: StyleLayer = "component") {
  const styles = registry();
  // First registration wins, so a stylesheet imported from two places keeps the
  // layer its owner declared.
  if (!styles.has(style)) styles.set(style, layer);
}

const supportsAdoptedStyleSheets = (): boolean => {
  try {
    return (
      typeof CSSStyleSheet !== "undefined" &&
      typeof ShadowRoot !== "undefined" &&
      "adoptedStyleSheets" in ShadowRoot.prototype &&
      "replaceSync" in CSSStyleSheet.prototype
    );
  } catch {
    return false;
  }
};

// One parsed stylesheet for every widget on the page. Without this each shadow
// root re-parses the full sheet, which is >1MB once the whatsapp wallpaper data
// URI is included.
let sharedSheet: CSSStyleSheet | null = null;
let sharedSheetCss = "";

const getSharedSheet = (): CSSStyleSheet | null => {
  const css = cssText();
  try {
    if (!sharedSheet) sharedSheet = new CSSStyleSheet();
    // Stylesheets register at module scope, so this normally runs once. It still
    // refreshes if a lazily imported module adds CSS after the first mount.
    if (sharedSheetCss !== css) {
      sharedSheet.replaceSync(css);
      sharedSheetCss = css;
    }
    return sharedSheet;
  } catch {
    return null;
  }
};

/**
 * Injects the widget's CSS into a shadow root. Prefers a single shared
 * constructable stylesheet, and falls back to an inline <style> element on
 * browsers without `adoptedStyleSheets` (Safari < 16.4).
 */
export function Styles({ shadowRoot }: { shadowRoot?: ShadowRoot }) {
  // If adoption throws despite the capability check, fall back rather than
  // render an unstyled widget. Set in a layout effect, so React re-renders with
  // the <style> element before the browser paints.
  const [adoptionFailed, setAdoptionFailed] = useState(false);
  const canAdopt =
    !!shadowRoot && supportsAdoptedStyleSheets() && !adoptionFailed;

  useLayoutEffect(() => {
    if (!shadowRoot || !canAdopt) return;
    const sheet = getSharedSheet();
    if (!sheet) {
      setAdoptionFailed(true);
      return;
    }
    // Guarded against double-adoption: effects run twice under StrictMode.
    if (shadowRoot.adoptedStyleSheets.includes(sheet)) return;
    try {
      shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
    } catch {
      setAdoptionFailed(true);
    }
  }, [shadowRoot, canAdopt]);

  if (canAdopt) return null;
  return <style>{cssText()}</style>;
}
