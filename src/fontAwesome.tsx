import { useEffect } from "react";
import { addInlineStyle } from "src/addStyles";

// the widget's base font rule (.gooey-embed-container * :not(code *)) outranks the
// kit's .fa-* classes, so hand icon elements back the kit's font family
addInlineStyle(`
.gooey-embed-container i[class*="fa-"] {
  font-family: var(--_fa-family);
}
`);

// Gooey's Font Awesome Pro kit (web font method), the same kit gooey.ai uses.
// It isn't limited to our domains, so it also loads on customer sites.
const FA_KIT_CSS_URL = "https://kit.fontawesome.com/8af9787bd5.css";
const FONT_FACE_STYLE_ID = "gooey-fa-font-faces";

// Renders the kit's icon classes (fa-regular, fa-toolbox, ...) inside the widget,
// and makes sure the host page has the fonts they draw with.
export function FontAwesomeStyles() {
  useEffect(() => {
    loadFontAwesomeFontFaces();
  }, []);
  return <link rel="stylesheet" href={FA_KIT_CSS_URL} />;
}

// Browsers ignore @font-face inside a shadow root, so the kit's font
// declarations are copied onto the host page. Only the "Font Awesome 7" families
// are copied: they can't clash with a host page's own Font Awesome, and none
// of the kit's class rules ever touch the page.
let fontFacesLoading: Promise<void> | undefined;

function loadFontAwesomeFontFaces() {
  fontFacesLoading ||= injectFontFaces().catch((e) => {
    fontFacesLoading = undefined;
    console.error("Failed to load Font Awesome fonts", e);
  });
  return fontFacesLoading;
}

async function injectFontFaces() {
  if (document.getElementById(FONT_FACE_STYLE_ID)) return;

  const kitCss = await fetchText(FA_KIT_CSS_URL);
  const sheetUrls = Array.from(
    kitCss.matchAll(/@import url\(["']?([^)"']+)["']?\)/g),
    (match) => match[1],
  );
  const sheets = await Promise.all(
    sheetUrls.map(async (url) => ({ url, css: await fetchText(url) })),
  );
  const fontFaces = sheets.flatMap(({ url, css }) =>
    (css.match(/@font-face\s*\{[^}]*\}/g) || [])
      .filter((rule) => /font-family:\s*["']Font Awesome 7/.test(rule))
      .map((rule) => absolutizeUrls(rule, url)),
  );
  if (!fontFaces.length) return;

  const style = document.createElement("style");
  style.id = FONT_FACE_STYLE_ID;
  style.textContent = fontFaces.join("\n");
  document.head.appendChild(style);
}

async function fetchText(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function absolutizeUrls(css: string, baseUrl: string) {
  return css.replace(
    /url\(["']?([^)"']+)["']?\)/g,
    (_, path) => `url(${new URL(path, baseUrl).href})`,
  );
}
