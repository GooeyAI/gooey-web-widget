import AppLayout from "src/components/shared/Layout/AppLayout";
import "./widget.scss";
import Header from "../Header";
import Messages from "../Messages";
import ChatInput, { CHAT_INPUT_ID } from "../ChatInput";
import { useMessagesContext } from "src/contexts/hooks";
import { FC, Fragment } from "react";
import clsx from "clsx";

type CopilotWidgetType = {
  isDirect?: boolean;
};

const CopilotWidget: FC<CopilotWidgetType> = ({ isDirect }) => {
  const { flushData, cancelApiCall }: any = useMessagesContext();
  const handleEditClick = () => {
    cancelApiCall();
    flushData();
    const ele = document.getElementById(CHAT_INPUT_ID);
    ele?.focus();
  };

  return (
    <Fragment>
      <main
        id='gooeyChat-container'
        className={clsx(
          "bg-white flex-1 d-flex flex-col justify-start overflow-hidden",
          isDirect
            ? "gooeyChat-widget-container-fullWidth"
            : "gooeyChat-widget-container"
        )}
      >
        <AppLayout>
          <div
            className="pos-relative d-flex flex-col flex-1 align-center justify-start overflow-hidden"
            style={{ maxHeight: "100%" }}
          >
            <Header onEditClick={handleEditClick} />

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
