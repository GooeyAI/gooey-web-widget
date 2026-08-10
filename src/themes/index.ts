export const THEME_IDS = ["default", "whatsapp", "builder"] as const;

export type ThemeId = (typeof THEME_IDS)[number];

function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" && (THEME_IDS as readonly string[]).includes(value)
  );
}

export function resolveTheme(theme: unknown): ThemeId {
  return isThemeId(theme) ? theme : "default";
}
