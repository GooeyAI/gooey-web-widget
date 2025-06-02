import clsx from "clsx";
import { useSystemContext } from "src/contexts/hooks";
import Header from "src/widgets/copilot/components/Header";

import { addInlineStyle } from "src/addStyles";
import style from "./appLayout.scss?inline";
import SideNavbar from "./SideNavbar";
import SecondaryDrawer from "./SecondaryDrawer";

addInlineStyle(style);

type Props = {
  children: React.ReactNode;
  view?: string;
  onViewChange?: (val: string) => void;
  isInline?: boolean;
};

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
  const { config, layoutController } = useSystemContext();

  return (
    <div
      id="gooeyChat-container"
      className={clsx(
        "gooeyChat-widget-container",
        generateParentContainerClass(
          layoutController!.isInline,
          config?.mode === "fullscreen",
          layoutController!.isFocusMode,
        ),
      )}
    >
      <div
        className="d-flex h-100 pos-relative"
      >
        <SideNavbar />
        {layoutController?.isSidebarOpen && layoutController?.isMobile && (
          <ClickAwayListener onClick={layoutController?.toggleSidebar} />
        )}
        <main className="pos-relative d-flex flex-1 flex-col align-center h-100 w-100 bg-white">
          <Header />
          {children}
        </main>
        <SecondaryDrawer />
      </div>
    </div>
  );
};

export default AppLayout;
