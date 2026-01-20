import { useMemo, useState } from "react";
import GooeyDialog from "src/components/shared/Dialog";
import Button from "src/components/shared/Buttons/Button";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import IconArrowUpBracket from "src/assets/SvgIcons/IconArrowUpBracket";
import IncomingMsg from "../Messages/IncomingMsg";
import OutgoingMsg from "../Messages/OutgoingMsg";
import GooeyTooltip from "src/components/shared/Tooltip";
import IconButton from "src/components/shared/Buttons/IconButton";
import clsx from "clsx";
import { Conversation } from "src/contexts/ConversationLayer";
import { CopilotConfigType } from "src/contexts/types";

type ShareDialogProps = {
  open: boolean;
  onClose: () => void;
  shareUrl?: string;
  conversationTitle?: string | null;
  firstAssistantMessage?: any;
  linkColor?: string;
  showSources?: boolean;
  firstUserMessage?: any;
  botTitle?: string | null;
};

const formatTitle = (title?: string | null) => {
  if (!title || title.trim().length === 0) return "Shared conversation";
  return title.length > 60 ? `${title.slice(0, 60)}…` : title;
};

const ShareDialog = ({
  open,
  onClose,
  shareUrl,
  conversationTitle,
  firstAssistantMessage,
  firstUserMessage,
  linkColor = "#000000",
  showSources = false,
  botTitle,
}: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);

  const title = useMemo(
    () => formatTitle(conversationTitle || "Untitled conversation"),
    [conversationTitle],
  );

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const openInNewTab = () => {
    if (!shareUrl) return;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (!shareUrl || !canNativeShare) return;
    try {
      await navigator.share({
        title: conversationTitle || "Conversation",
        text: "Check out this conversation",
        url: shareUrl,
      });
    } catch (err) {
      // Ignore user cancellations or unsupported cases silently
      console.debug("Share canceled or failed", err);
    }
  };

  return (
    <GooeyDialog
      open={open}
      onClose={onClose}
      title="Share conversation"
      subtitle={botTitle}
      maxWidth="md"
      fullWidth
    >
      <div className="d-flex flex-col gap-8">
        <div className="bg-background b-1 br-large gp-16 gmb-12">
          <div className="d-flex align-center justify-between gmb-12 gap-12 flex-wrap">
            <div>
              <p className="font_13_500 text-muted gmb-4">
                Conversation preview
              </p>
              <p className="font_16_700 text-primary gmb-12">{title}</p>
            </div>
            <div className="d-flex align-center gap-8">
              <Button
                variant="text"
                onClick={handleCopy}
                disabled={!shareUrl}
                aria-label="Copy link again"
              >
                <div className="d-flex align-center" style={{ gap: 8 }}>
                  {copied ? (
                    <>Copied!</>
                  ) : (
                    <>
                      <IconCopy size={16} />
                      <span>Copy link</span>
                    </>
                  )}
                </div>
              </Button>
              {canNativeShare && (
                <Button
                  variant="outlined"
                  onClick={handleNativeShare}
                  disabled={!shareUrl}
                  aria-label="Share via system sheet"
                >
                  <div className="d-flex align-center" style={{ gap: 8 }}>
                    <IconArrowUpBracket size={16} />
                    <span>Share</span>
                  </div>
                </Button>
              )}
            </div>
          </div>
          <div
            className="br-default b-1 gp-16 overflow-hidden pos-relative"
            style={{
              height: "240px",
              pointerEvents: "none",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%)",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.48) 100%)",
              filter: "blur(1px)",
            }}
          >
            {firstUserMessage ? (
              <OutgoingMsg
                input_prompt={firstUserMessage.input_prompt}
                input_audio={firstUserMessage.input_audio}
                input_images={firstUserMessage.input_images}
                input_documents={firstUserMessage.input_documents}
                button_pressed={firstUserMessage.button_pressed}
                input_location={firstUserMessage.input_location}
              />
            ) : null}
            {firstAssistantMessage ? (
              <IncomingMsg
                data={firstAssistantMessage}
                autoPlay={false}
                showRunLink={false}
                id={firstAssistantMessage.id}
                showSources={showSources}
                linkColor={linkColor}
              />
            ) : null}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div className="br-default b-1 gp-16 d-flex align-center justify-between bg-grey flex-wrap">
            <div
              style={{
                flex: 1,
                minWidth: 220,
              }}
            >
              <p className="font_13_500 text-muted gmb-4">Shareable link</p>
              <p className="font_14_600 text-primary gmb-4">
                {shareUrl || "Link will appear here once available"}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                variant="filled"
                onClick={openInNewTab}
                disabled={!shareUrl}
                aria-label="Open share link"
              >
                <div className="d-flex align-center" style={{ gap: 8 }}>
                  <IconExternalLink size={16} />
                  <span>Open</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GooeyDialog>
  );
};

const ShareButton = ({
  disabled,
  currentConversation,
  messages,
  config,
}: {
  disabled: boolean;
  currentConversation: Conversation | null;
  messages: Map<string, any>;
  config: CopilotConfigType;
}) => {
  const branding = config?.branding;
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

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
    <>
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
      <GooeyTooltip text="Share Conversation" disabled={disabled}>
        <IconButton
          variant="text"
          className={clsx("gp-8 cr-pointer flex-1")}
          onClick={handleShareConversation}
          disabled={disabled}
        >
          <IconArrowUpBracket size={22} />
        </IconButton>
      </GooeyTooltip>
    </>
  );
};
export { ShareButton };
