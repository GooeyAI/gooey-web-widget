import IconButton from "src/components/shared/Buttons/IconButton";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import clsx from "clsx";
import { SystemContextType } from "src/contexts/SystemContext";
import { useMemo, useState } from "react";

import IconExpand from "src/assets/SvgIcons/IconExpand";
import IconCollapse from "src/assets/SvgIcons/IconCollapse";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import GooeyTooltip from "src/components/shared/Tooltip";
import IconChevronDown from "src/assets/SvgIcons/IconChevronDown";
import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import Button from "src/components/shared/Buttons/Button";
import IconClose from "src/assets/SvgIcons/IconClose";
import IconArrowUpBracket from "src/assets/SvgIcons/IconArrowUpBracket";
import ShareDialog from "./ShareDialog";

const Header = () => {
  const { layoutController, config }: SystemContextType = useSystemContext();
  const {
    messages,
    handleNewConversation,
    currentConversation,
    isSending,
    isReceiving,
  } = useMessagesContext();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const isEmpty = !messages?.size;
  const branding = config?.branding;
  const onClose = config?.onClose;

  const conversationTitle = useMemo(
    () => currentConversation?.title || branding?.title || "Conversation",
    [currentConversation?.title, branding?.title],
  );

  const [firstAssistantMessage, firstUserMessage] = useMemo(() => {
    if (!messages?.size) return [null, null];
    let assistantMessage = null;
    let userMessage = null;
    for (const msg of messages.values()) {
      if (msg?.role === "user") userMessage = msg;
      else assistantMessage = msg;
      if (userMessage && assistantMessage) break;
    }
    return [assistantMessage, userMessage];
  }, [messages]);

  const buildShareUrl = () => {
    if (!currentConversation?.id) return "";
    const url = new URL(window.location.href);

    const regex = /\/share\/.*/;
    let normalizedPath = url.pathname.endsWith("/")
      ? url.pathname.slice(0, -1)
      : url.pathname;
    normalizedPath = normalizedPath.replace(regex, "");
    url.pathname = `${normalizedPath}/share/${currentConversation?.id}`;
    url.hash = "";
    return url.toString();
  };

  const handleShareConversation = () => {
    const url = buildShareUrl();
    if (!url) return;
    setShareUrl(url);
    setShareDialogOpen(true);
    navigator.clipboard.writeText(url).catch(() => undefined);
  };

  const closeShareDialog = () => setShareDialogOpen(false);

  return (
    <div
      className="bg-white b-btm-1 gp-8 d-flex justify-between align-center pos-sticky top-0 w-100 h-header"
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
          <Button onClick={handleNewConversation} disabled={isEmpty}>
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
              <p className="font_16_700 text-almostBlack">
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
          {/* Share conversation button */}
          {config?.enableShareConversation && !isEmpty && (
            <GooeyTooltip
              text="Share Conversation"
              disabled={isSending || isReceiving}
            >
              <IconButton
                variant="text"
                className={clsx("gp-8 cr-pointer flex-1")}
                onClick={handleShareConversation}
                disabled={isSending || isReceiving}
              >
                <IconArrowUpBracket size={22} />
              </IconButton>
            </GooeyTooltip>
          )}

          {/* New Chat button - hide when enableShareConversation is false */}
          {layoutController?.showNewConversationButton && (
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
          {layoutController?.isInline && onClose && (
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
      <ShareDialog
        open={shareDialogOpen}
        onClose={closeShareDialog}
        shareUrl={shareUrl}
        conversationTitle={conversationTitle}
        botTitle={branding?.title}
        firstAssistantMessage={firstAssistantMessage}
        firstUserMessage={firstUserMessage}
        linkColor={config?.branding?.colors?.primary}
        showSources={config?.showSources}
      />
    </div>
  );
};

export default Header;
