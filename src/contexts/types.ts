export interface CopilotConfigType {
  target: string;
  deployment_id: string;
  /** @deprecated Use deployment_id instead. This field will be removed in a future version. */
  integration_id?: string;
  mode: "popup" | "inline" | "fullscreen";
  enableAudioMessage: boolean;
  enablePhotoUpload: boolean;
  enableLipsyncVideo: boolean;
  enableConversations: boolean;
  autoPlayResponses: boolean;
  showSources: boolean;
  expandedSources: boolean;
  apiUrl?: string;
  enableSourcePreview?: boolean;
  onClose?: () => void;
  secrets?: {
    GOOGLE_MAPS_API_KEY?: string;
  };
  branding: {
    name?: string;
    title?: string;
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
