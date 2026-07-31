export const THEME_IDS = ["default", "whatsapp"] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export function resolveTheme(theme: unknown): ThemeId {
  return THEME_IDS.includes(theme as ThemeId) ? (theme as ThemeId) : "default";
}
