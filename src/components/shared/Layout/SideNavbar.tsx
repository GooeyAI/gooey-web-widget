import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import IconButton from "../Buttons/IconButton";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import Button from "../Buttons/Button";
import clsx from "clsx";
import { Conversation } from "src/contexts/ConversationLayer";
import React from "react";
import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import GooeyTooltip from "../Tooltip";

const SideNavbar = () => {
  const {
    conversations,
    setActiveConversation,
    currentConversationId,
    handleNewConversation,
    messages,
  } = useMessagesContext();
  const { layoutController, config } = useSystemContext();
  const branding = config?.branding;
  const conversationsList = React.useMemo(() => {
    if (!conversations || conversations.length === 0) return [];
    const now = new Date().getTime();
    const today = new Date().setHours(0, 0, 0, 0);
    const endToday = new Date().setHours(23, 59, 59, 999);
    const yesterday = new Date(today - 1).setHours(0, 0, 0, 0);
    const endYesterday = new Date(today - 1).setHours(23, 59, 59, 999);
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // days x hours x minutes x seconds x milliseconds
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // days x hours x minutes x seconds x milliseconds

    const grouped: any = {
      Today: [],
      Yesterday: [],
      "Previous 7 Days": [],
      "Previous 30 Days": [],
      Months: {},
    };

    conversations.forEach((conversation: Conversation) => {
      const lastMessageTimestamp = new Date(
        conversation.timestamp as string,
      ).getTime();
      let subheading: string;

      if (lastMessageTimestamp >= today && lastMessageTimestamp <= endToday) {
        subheading = "Today";
      } else if (
        lastMessageTimestamp >= yesterday &&
        lastMessageTimestamp <= endYesterday
      ) {
        subheading = "Yesterday";
      } else if (
        lastMessageTimestamp > endToday - sevenDaysInMs &&
        lastMessageTimestamp <= endToday
      ) {
        subheading = "Previous 7 Days";
      } else if (now - lastMessageTimestamp <= thirtyDaysInMs) {
        subheading = "Previous 30 Days";
      } else {
        const monthName: string = new Date(lastMessageTimestamp).toLocaleString(
          "default",
          {
            month: "long",
          },
        );
        if (!grouped.Months[monthName]) {
          grouped.Months[monthName] = [];
        }
        grouped.Months[monthName].push(conversation);
        return; // Skip adding to other groups
      }
      grouped[subheading].unshift(conversation);
    });

    // Convert Months object to array
    const monthEntries = Object.entries(grouped.Months).map(
      ([monthName, conversations]) => ({
        subheading: monthName,
        conversations,
      }),
    );

    // Combine all groups into a single array
    return [
      { subheading: "Today", conversations: grouped.Today },
      { subheading: "Yesterday", conversations: grouped.Yesterday },
      {
        subheading: "Previous 7 Days",
        conversations: grouped["Previous 7 Days"],
      },
      {
        subheading: "Previous 30 Days",
        conversations: grouped["Previous 30 Days"],
      },
      ...monthEntries,
    ].filter((group) => group?.conversations?.length > 0);
  }, [conversations]);

  if (!layoutController?.showNewConversationButton) return null;
  const isEmpty = !messages?.size;
  return (
    <nav
      id="gooey-side-navbar"
      style={{
        transition: layoutController?.isMobile
          ? "none"
          : "width ease-in-out 0.2s",
        width: layoutController?.isMobile ? "0px" : "260px",
        zIndex: 10,
      }}
      className={clsx(
        "b-rt-1 h-100 overflow-x-hidden top-0 left-0 bg-grey d-flex flex-col",
        layoutController?.isMobile ? "pos-absolute" : "pos-relative",
      )}
    >
      <div
        className="pos-relative d-flex flex-col h-100"
        style={{ width: "260px" }}
      >
        {/* Header */}
        <div className="gp-8 b-btm-1 h-header d-flex align-center">
          {/* Close / minimize button */}
          {/* Sidebar button */}
          <GooeyTooltip text="Close sidebar" direction="right">
            <IconButton
              variant="text"
              className="cr-pointer"
              onClick={layoutController?.toggleSidebar}
            >
              <IconSidebar size={20} />
            </IconButton>
          </GooeyTooltip>
        </div>

        <div className="pos-relative d-flex flex-col h-100 flex-1 overflow-y-auto">
          <div className="gp-8">
            <GooeyTooltip text="New Chat" direction="right" disabled={isEmpty}>
              <Button
                className="w-100 pos-relative text-dark"
                disabled={isEmpty}
                onClick={() => {
                  handleNewConversation?.();
                  if (layoutController?.isSecondaryDrawerOpen)
                    layoutController?.toggleSecondaryDrawer(null);
                }}
                hideOverflow
                RightIconComponent={() => <IconPencilEdit size={18} />}
              >
                <div className="d-flex align-center">
                  <div
                    className="bot-avatar bg-primary gmr-12"
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "100%",
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
                  <p
                    className={clsx(
                      "font_16_600 text-left",
                      isEmpty ? "text-muted" : "text-almostBlack",
                    )}
                    style={{
                      maxWidth: "70%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    New Chat
                  </p>
                </div>
              </Button>
            </GooeyTooltip>
          </div>

          {/* Conversations list */}
          {conversationsList.length === 0 ? (
            <div className="h-100 gpb-30 d-flex align-center justify-center">
              <p className="gmb-30 text-muted text-center font_14_400">
                No conversations yet
              </p>
            </div>
          ) : (
            <div className="gp-8 flex-1 h-100">
              {conversationsList.map((group: any) => (
                <div key={group.subheading} className="gmb-30">
                  <div
                    className="top-0 gpt-8 gpb-8 bg-grey pos-sticky"
                    style={{ zIndex: 1 }}
                  >
                    <h5 className="gpl-8 text-muted">{group.subheading}</h5>
                  </div>
                  <ol>
                    {group.conversations
                      .sort(
                        (a: Conversation, b: Conversation) =>
                          new Date(b.timestamp as string).getTime() -
                          new Date(a.timestamp as string).getTime(),
                      )
                      .map((conversation: Conversation) => {
                        return (
                          <li key={conversation.id}>
                            <ConversationButton
                              conversation={conversation}
                              isActive={
                                currentConversationId === conversation?.id
                              }
                              onClick={() => {
                                setActiveConversation?.(conversation);
                                if (layoutController?.isMobile)
                                  layoutController?.toggleSidebar();
                                if (layoutController?.isSecondaryDrawerOpen)
                                  layoutController?.toggleSecondaryDrawer(null);
                              }}
                            />
                          </li>
                        );
                      })}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Memoized component for individual conversation buttons
const ConversationButton: React.FC<{
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}> = React.memo(({ conversation, isActive, onClick }) => {
  // use timestamp in day, time format for title if no message is present
  const tempTitle =
    conversation?.title ||
    new Date(conversation.timestamp as string).toLocaleString("default", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  return (
    <Button
      className="w-100 gp-8 gmb-6 text-left"
      variant={isActive ? "filled" : "text-alt"}
      onClick={onClick}
      hideOverflow
    >
      <p className="font_14_400">{tempTitle}</p>
    </Button>
  );
});

export default SideNavbar;
