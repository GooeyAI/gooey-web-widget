import clsx from "clsx";

import IconButton from "src/components/shared/Buttons/IconButton";
import Button from "src/components/shared/Buttons/Button";
import GooeyTooltip from "src/components/shared/Tooltip";

import IconExpand from "src/assets/SvgIcons/IconExpand";
import IconCollapse from "src/assets/SvgIcons/IconCollapse";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";

type HeaderProps = {
  isEmptyMessages?: boolean;
  onNewConversation?: () => void;
  isFocusMode?: boolean;
  showFocusModeButton?: boolean;
  showCloseButton?: boolean;
  showNewConversationButton?: boolean;
  showSidebarButton?: boolean;
  isInline?: boolean;
  toggleFocusMode?: () => void;
  toggleOpenClose?: () => void;
  toggleSidebar?: () => void;
  name?: string;
  photoUrl?: string;
  className?: string;
  disableTooltip?: boolean;
};

const Header = ({
  isEmptyMessages = true,
  onNewConversation = () => {},
  name = "Gooey Bot",
  photoUrl = "https://gooey.ai/favicon.ico",
  showSidebarButton = false,
  isFocusMode = false,
  isInline = true,
  showCloseButton = false,
  showFocusModeButton = false,
  showNewConversationButton = false,
  toggleFocusMode = () => {},
  toggleOpenClose = () => {},
  toggleSidebar = () => {},
  className = "",
  disableTooltip = false,
}: HeaderProps) => {
  return (
    <div
      className={clsx(
        "bg-white b-btm-1 d-flex justify-between align-center pos-sticky w-100 h-header",
        className
      )}
    >
      {/* Left section (sidebar button) */}
      <div className="d-flex align-center">
        {showSidebarButton && (
          <GooeyTooltip text="Open sidebar" direction="right" disabled={disableTooltip}>
            <IconButton
              id="sidebar-toggle-icon-header"
              variant="text"
              className="cr-pointer"
              onClick={toggleSidebar}
            >
              <IconSidebar size={20} />
            </IconButton>
          </GooeyTooltip>
        )}
      </div>

      {/* Center (branding and new conversation button) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <GooeyTooltip
          text="New Chat"
          disabled={isEmptyMessages || disableTooltip}
          direction="bottom"
        >
          <Button onClick={onNewConversation} disabled={isEmptyMessages}>
            <div className="d-flex align-center">
              <div
                className="bot-avatar bg-primary gmr-8"
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "100%",
                }}
              >
                <img
                  src={photoUrl}
                  alt="bot-avatar"
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "100%",
                  }}
                />
              </div>
              <p className="font_16_700 text-almostBlack">{name}</p>
            </div>
          </Button>
        </GooeyTooltip>
      </div>

      {/* Right section (action buttons) */}
      <div>
        <div className="d-flex align-center">
          {showFocusModeButton && (
            <GooeyTooltip
              text={isFocusMode ? "Disable Focus" : "Enable Focus"}
              direction="bottom"
              disabled={disableTooltip}
            >
              <IconButton
                variant="text"
                className="cr-pointer"
                onClick={toggleFocusMode}
                style={{ transform: "rotate(90deg)" }}
              >
                {isFocusMode ? (
                  <IconCollapse size={16} />
                ) : (
                  <IconExpand size={16} />
                )}
              </IconButton>
            </GooeyTooltip>
          )}

          {showCloseButton && (
            <GooeyTooltip text="Close" direction="left" disabled={disableTooltip}>
              <IconButton
                variant="text"
                className={clsx("gp-8 cr-pointer flex-1")}
                onClick={toggleOpenClose}
              >
                <IconChevronDown size={16} />
              </IconButton>
            </GooeyTooltip>
          )}

          {isInline && showNewConversationButton && (
            <GooeyTooltip
              text="New Chat"
              direction="left"
              disabled={isEmptyMessages || disableTooltip}
            >
              <IconButton
                disabled={isEmptyMessages}
                variant="text"
                className={clsx("gp-8 cr-pointer flex-1")}
                onClick={onNewConversation}
              >
                <IconPencilEdit size={22} />
              </IconButton>
            </GooeyTooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
