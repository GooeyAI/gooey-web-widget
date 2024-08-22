import clsx from "clsx";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import { CHAT_INPUT_ID } from "src/widgets/copilot/components/ChatInput";
import Header from "src/widgets/copilot/components/Header";

import { addInlineStyle } from "src/addStyles";
import style from "./appLayout.scss?inline";
import SideNavbar from "./SideNavbar";

addInlineStyle(style);

type Props = {
  children: JSX.Element | JSX.Element[] | (() => JSX.Element);
  view?: string;
  onViewChange?: (val: string) => void;
  isInline?: boolean;
};

const CHAT_WINDOW_WIDTH = 760;

const generateParentContainerClass = (
  isInline: boolean,
  isFullScreen: boolean,
  isFocusMode: boolean
) => {
  if (!isInline) {
    if (isFocusMode) return "gooey-focused-popup";
    return "gooey-popup";
  }
  if (isFullScreen) return "gooey-fullscreen-container";
  return "gooey-inline-container";
};

const AppLayout = ({ children, isInline = true }: Props) => {
  const { config, layoutController } = useSystemContext();
  const { flushData, cancelApiCall }: any = useMessagesContext();

  const handleEditClick = () => {
    cancelApiCall();
    flushData();
    const shadowRoot = document.querySelector((config?.target || "") as string)
      ?.firstElementChild?.shadowRoot;
    const ele = shadowRoot?.getElementById(CHAT_INPUT_ID);
    ele?.focus();
  };

  return (
    <div
      id="gooeyChat-container"
      className={clsx(
        "overflow-hidden gooeyChat-widget-container",
        generateParentContainerClass(
          layoutController!.isInline,
          config?.mode === "fullscreen",
          layoutController!.isFocusMode
        )
      )}
    >
      <div className="d-flex h-100">
        <SideNavbar />
        <i className="fa-solid fa-magnifying-glass"></i>
        <main className="pos-relative d-flex flex-1 flex-col align-center overflow-hidden h-100 bg-white">
          <Header onEditClick={handleEditClick} hideClose={isInline} />
          <div
            style={{ maxWidth: `${CHAT_WINDOW_WIDTH}px`, height: "100%" }}
            className="d-flex flex-col flex-1 gp-0 w-100 overflow-hidden bg-white w-100"
          >
            <>{children}</>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
