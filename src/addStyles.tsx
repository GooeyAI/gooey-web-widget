declare global {
  var addedStyles: Set<string>;
}

export function Styles() {
  return <style>{Array.from(globalThis.addedStyles).join("\n")}</style>;
}

export function addInlineStyle(style: string) {
  globalThis.addedStyles = globalThis.addedStyles || new Set();
  globalThis.addedStyles.add(style);
}
