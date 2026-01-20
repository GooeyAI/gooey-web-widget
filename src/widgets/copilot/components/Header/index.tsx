import IconButton from "src/components/shared/Buttons/IconButton";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import clsx from "clsx";
import { SystemContextType } from "src/contexts/SystemContext";

import IconExpand from "src/assets/SvgIcons/IconExpand";
import IconCollapse from "src/assets/SvgIcons/IconCollapse";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import GooeyTooltip from "src/components/shared/Tooltip";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import Button from "src/components/shared/Buttons/Button";
import IconClose from "src/assets/SvgIcons/IconClose";
import { ShareButton } from "./ShareDialog";

const Header = () => {
  const { layoutController, config }: SystemContextType = useSystemContext();
  const {
    messages,
    handleNewConversation,
    currentConversation,
    isSending,
    isReceiving,
  } = useMessagesContext();
  const isEmpty = !messages?.size;
  const branding = config?.branding;
  const onClose = config?.onClose;

  return (
    <div
      className="bg-background b-btm-1 gp-8 d-flex justify-between align-center pos-sticky top-0 w-100 h-header"
      style={{ zIndex: 1 }}
    >
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
        <GooeyTooltip text="New Chat" disabled={isEmpty} direction="bottom">
          <Button
            onClick={handleNewConversation}
            disabled={isEmpty}
            variant="text"
          >
            <div className="d-flex align-center">
              <div
                className="bot-avatar bg-primary gmr-8"
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "100%",
                  // marginLeft: "-12px",
                }}
              >
                <img
                  src={branding?.photoUrl}
                  alt="bot-avatar"
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "100%",
                  }}
                />
              </div>
              <p className="font_16_700 text-primary">
                {branding?.title || "New Chat"}
              </p>
            </div>
          </Button>
        </GooeyTooltip>
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
            <GooeyTooltip text="Close" direction="left">
              <IconButton
                variant="text"
                className={clsx("gp-8 cr-pointer flex-1")}
                onClick={layoutController?.toggleOpenClose}
              >
                <IconChevronDown size={16} />
              </IconButton>
            </GooeyTooltip>
          )}
          {/* Share conversation button - only show in gooey app site mode */}
          {config?.enableShareConversation &&
            !isEmpty &&
            layoutController?.isGooeyChatApp && (
              <ShareButton
                currentConversation={currentConversation || null}
                messages={messages}
                config={config}
                disabled={isSending || isReceiving || false}
              />
            )}

          {layoutController?.isInline && (
            <GooeyTooltip text="New Chat" direction="left" disabled={isEmpty}>
              <IconButton
                disabled={isEmpty}
                variant="text"
                className={clsx("gp-8 cr-pointer flex-1")}
                onClick={handleNewConversation}
              >
                <IconPencilEdit size={22} />
              </IconButton>
            </GooeyTooltip>
          )}

          {!!onClose && (
            <IconButton
              variant="text"
              className={clsx("gp-8 cr-pointer flex-1")}
              onClick={onClose}
            >
              <IconClose size={22} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
