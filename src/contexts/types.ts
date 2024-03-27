export interface CopilotConfigType {
  secret_key: string;
  bot_id: string;
  bot_profile: {
    title: string;
    description: string;
    created_by: string;
    display_picture: string;
  };
  link_color: string;
  icon_text: string;
};
