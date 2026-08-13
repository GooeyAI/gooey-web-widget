const COMPLETE_SVG_PATTERN = /<svg\b[^>]*>[\s\S]*<\/svg>/i;
const SVG_FENCE_LANGUAGES = new Set(["svg", "xml"]);
const SCRIPT_OR_FOREIGN_OBJECT =
  /<(script|foreignObject)\b[^>]*>[\s\S]*?<\/\1>/gi;
const EVENT_HANDLER_ATTR = /\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const JAVASCRIPT_HREF =
  /(?:xlink:)?href\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi;

export const extractCompleteSvg = (text: string): string | null => {
  const match = text.match(COMPLETE_SVG_PATTERN);
  return match ? match[0] : null;
};

export const isSvgFenceLanguage = (language: string): boolean => {
  return SVG_FENCE_LANGUAGES.has(language.toLowerCase());
};

export const isPrimarilySvg = (text: string): boolean => {
  const stripped = text
    .trim()
    .replace(/^<\?xml[^?]*\?>\s*/i, "")
    .replace(/<!--[\s\S]*?-->\s*/g, "");
  return /^<svg\b/i.test(stripped);
};

export const previewableSvgFromCode = (
  language: string,
  body: string,
): string | null => {
  const svg = extractCompleteSvg(body);
  if (!svg) return null;
  if (isSvgFenceLanguage(language) || isPrimarilySvg(body)) {
    return svg;
  }
  return null;
};

export const prepareSvgForPreview = (svg: string): string => {
  return ensureSvgNamespace(sanitizeSvg(svg));
};

const sanitizeSvg = (svg: string): string => {
  return svg
    .replace(SCRIPT_OR_FOREIGN_OBJECT, "")
    .replace(EVENT_HANDLER_ATTR, "")
    .replace(JAVASCRIPT_HREF, "");
};

const ensureSvgNamespace = (svg: string): string => {
  if (/\sxmlns\s*=/i.test(svg)) return svg;
  return svg.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
};
