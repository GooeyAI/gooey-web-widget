export interface CopilotConfigType {
  type: "copilot-direct" | "copilot-fab";
  bot_id: string;
  bot_profile: {
    title: string;
    description: string;
    created_by: string;
    display_picture: string;
    creator_link?: string;
  };
  link_color: string;
  widget_text: string;
  show_gooey_branding: boolean;
  questions: string[];
  show_sources: boolean;
  audio_message: boolean;
}
