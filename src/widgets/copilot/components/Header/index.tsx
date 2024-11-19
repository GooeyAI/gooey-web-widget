import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import IconButton from "src/components/shared/Buttons/IconButton";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import IconClose from "src/assets/SvgIcons/IconClose";
import clsx from "clsx";
import { SystemContextType } from "src/contexts/SystemContext";

import IconExpand from "src/assets/SvgIcons/IconExpand";
import IconCollapse from "src/assets/SvgIcons/IconCollapse";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import GooeyTooltip from "src/components/shared/Tooltip";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";

const Header = () => {
  const { messages }: any = useMessagesContext();
  const { layoutController, config }: SystemContextType = useSystemContext();
  const isEmpty = !messages?.size;
  const branding = config?.branding;
  return (
    <div className="bg-white b-btm-1 gp-8 d-flex justify-between align-center pos-sticky w-100 h-header">
      <div className="d-flex align-center">
        {/* Sidebar button */}
        {layoutController?.showSidebarButton && (
          <GooeyTooltip text="Open sidebar" direction="right">
            <IconButton
              id="sidebar-toggle-icon-header"
              variant="text"
              className="cr-pointer"
              onClick={layoutController?.toggleSidebar}
            >
              <IconSidebar size={20} />
            </IconButton>
          </GooeyTooltip>
        )}
      </div>
      <div
        className="d-flex align-center"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="bot-avatar bg-primary gmr-8"
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "100%",
            marginLeft: "-12px",
          }}
        >
          <img
            src={branding?.photoUrl}
            alt="bot-avatar"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <p className="font_16_700">{branding?.name}</p>
      </div>
      <div>
        <div className="d-flex align-center">
          {/* Focus mode button */}
          {layoutController?.showFocusModeButton && (
            <GooeyTooltip
              text={
                layoutController.isFocusMode ? "Disable Focus" : "Enable Focus"
              }
              direction="bottom"
            >
              <IconButton
                variant="text"
                className="cr-pointer"
                onClick={layoutController?.toggleFocusMode}
                style={{ transform: "rotate(90deg)" }}
              >
                {layoutController.isFocusMode ? (
                  <IconCollapse size={16} />
                ) : (
                  <IconExpand size={16} />
                )}
              </IconButton>
            </GooeyTooltip>
          )}
          {/* Close / minimize button */}
          {layoutController?.showCloseButton && (
            <GooeyTooltip text="New Chat" direction="left" disabled={isEmpty}>
              <IconButton
                variant="text"
                className={clsx("gp-8 cr-pointer flex-1")}
                onClick={layoutController?.toggleOpenClose}
              >
                <IconChevronDown size={16} />
              </IconButton>
            </GooeyTooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
