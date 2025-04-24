import clsx from "clsx";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import Header from "src/widgets/copilot/components/Header";

import { addInlineStyle } from "src/addStyles";
import style from "./appLayout.scss?inline";
import SideNavbar from "./SideNavbar";
import SecondaryDrawer from "./SecondaryDrawer";
import { MessagesContextType } from "src/contexts/MessagesContext";
import { SystemContextType } from "src/contexts/SystemContext";

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
  isFocusMode: boolean,
) => {
  if (!isInline) {
    if (isFocusMode) return "gooey-focused-popup";
    return "gooey-popup";
  }
  if (isFullScreen) return "gooey-fullscreen-container";
  return "gooey-inline-container";
};

const ClickAwayListener = ({ onClick, children }: any) => {
  return (
    <div
      onClick={onClick}
      style={{
        height: "100%",
        width: "100%",
        zIndex: 1,
        background: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(0.2px)",
      }}
      className="pos-absolute top-0 cr-pointer"
    >
      {children}
    </div>
  );
};

const AppLayout = ({ children }: Props) => {
  const { config, layoutController, } = useSystemContext() as SystemContextType;
  const { messages, handleNewConversation } = useMessagesContext() as MessagesContextType;
  return (
    <div
      id="gooeyChat-container"
      className={clsx(
        "overflow-hidden gooeyChat-widget-container",
        generateParentContainerClass(
          layoutController!.isInline,
          config?.mode === "fullscreen",
          layoutController!.isFocusMode,
        ),
      )}
    >
      <div className="d-flex h-100 pos-relative">
        <SideNavbar />
        {layoutController?.isSidebarOpen && layoutController?.isMobile && (
          <ClickAwayListener onClick={layoutController?.toggleSidebar} />
        )}
        <main className="pos-relative d-flex flex-1 flex-col align-center overflow-hidden h-100 bg-white">
          <Header
            {...layoutController}
            isEmptyMessages={!messages.size}
            onNewConversation={handleNewConversation}
            name={config?.branding?.name}
            photoUrl={config?.branding?.photoUrl}
            className='gp-8'
          />
          <div
            style={{ maxWidth: `${CHAT_WINDOW_WIDTH}px`, height: "100%" }}
            className="d-flex flex-col flex-1 gp-0 w-100 overflow-hidden bg-white w-100"
          >
            <>{children}</>
          </div>
        </main>
        <SecondaryDrawer />
      </div>
    </div>
  );
};

export default AppLayout;
