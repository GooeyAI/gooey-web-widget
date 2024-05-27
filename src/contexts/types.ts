export interface CopilotConfigType {
  target: string;
  integration_id: string;
  mode: "popup" | "inline" | "fullscreen";
  enableAudioMessage: boolean;
  showSources: boolean;
  branding: {
    name?: string;
    byLine?: string;
    description?: string;
    conversationStarters?: string[];
    fabLabel?: string;
    photoUrl?: string;
    websiteUrl?: string;
    showPoweredByGooey?: boolean;
    colors?: {
      primary: string;
      secondary: string;
    };
  };
  payload?: any;
}
