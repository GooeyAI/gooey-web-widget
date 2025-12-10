import { useMemo, useState } from "react";
import GooeyDialog from "src/components/shared/Dialog";
import Button from "src/components/shared/Buttons/Button";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconExternalLink from "src/assets/SvgIcons/IconExternalLink";
import IconArrowUpBracket from "src/assets/SvgIcons/IconArrowUpBracket";
import IncomingMsg from "../Messages/IncomingMsg";
import OutgoingMsg from "../Messages/OutgoingMsg";

type ShareDialogProps = {
  open: boolean;
  onClose: () => void;
  shareUrl?: string;
  conversationTitle?: string | null;
  firstAssistantMessage?: any;
  linkColor?: string;
  showSources?: boolean;
  firstUserMessage?: any;
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

  const linkedInHref = shareUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    : undefined;
  const redditHref = shareUrl
    ? `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`
    : undefined;

  return (
    <GooeyDialog
      open={open}
      onClose={onClose}
      title="Share conversation"
      subtitle={title}
      maxWidth="md"
      fullWidth
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div className="bg-white b-1 br-large gp-16 gmb-12">
          <div className="d-flex align-center justify-between gmb-12 gap-12">
            <div>
              <p className="font_13_500 text-muted gmb-4">
                Conversation preview
              </p>
              <p className="font_16_700 text-almostBlack">{title}</p>
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
              <p className="font_14_600 text-almostBlack gmb-4">
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

export default ShareDialog;
