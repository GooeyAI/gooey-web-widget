import Messages from "../Messages";
import ChatInput from "../ChatInput";
import { FC } from "react";
import AppLayout from "src/components/shared/Layout/AppLayout";

type CopilotWidgetType = {
  isInline?: boolean;
};

const CopilotWidget: FC<CopilotWidgetType> = ({ isInline }) => {
  return (
    <AppLayout isInline={isInline}>
      <Messages />
      <ChatInput />
    </AppLayout>
  );
};
export default CopilotWidget;
