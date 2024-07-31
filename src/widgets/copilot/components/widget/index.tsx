import AppLayout from "src/components/shared/Layout/AppLayout";
import Header from "../Header";
import Messages from "../Messages";
import ChatInput, { CHAT_INPUT_ID } from "../ChatInput";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { FC, Fragment } from "react";
import clsx from "clsx";

import { addInlineStyle } from "src/addStyles";
import style from "./widget.scss?inline";
import { SystemContextType } from "src/contexts/SystemContext";

addInlineStyle(style);

type CopilotWidgetType = {
  isInline?: boolean;
};

const CopilotWidget: FC<CopilotWidgetType> = ({ isInline }) => {
  const { isExpanded }: SystemContextType = useSystemContext();
  const { flushData, cancelApiCall }: any = useMessagesContext();
  const handleEditClick = () => {
    cancelApiCall();
    flushData();
    const shadowRoot = document.getElementById(isInline ? "inline" : "popup")?.firstElementChild?.shadowRoot;
    const ele = shadowRoot?.getElementById(CHAT_INPUT_ID);
    ele?.focus();
  };

  return (
    <Fragment>
      <main
        id="gooeyChat-container"
        className={clsx(
          "bg-white d-flex flex-col justify-start overflow-hidden",
          isInline || isExpanded
            ? "gooeyChat-widget-container-fullWidth"
            : "gooeyChat-widget-container"
        )}
      >
        <AppLayout>
          <div
            className="pos-relative d-flex flex-col flex-1 align-center justify-start overflow-hidden"
            style={{ maxHeight: "100%" }}
          >
            <Header onEditClick={handleEditClick} hideClose={isInline} />

            {/* Limited Width for large devices */}
            <div
              style={{ maxWidth: "760px", height: "100%" }}
              className="d-flex flex-col flex-1 gp-0 w-100 overflow-hidden"
            >
              <Messages />
              <ChatInput />
            </div>
          </div>
        </AppLayout>
      </main>
    </Fragment>
  );
};

export default CopilotWidget;
