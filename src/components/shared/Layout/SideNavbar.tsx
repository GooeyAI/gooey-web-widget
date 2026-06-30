import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import IconButton from "../Buttons/IconButton";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import Button from "../Buttons/Button";
import clsx from "clsx";
import { Conversation } from "src/contexts/ConversationLayer";
import React from "react";
import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import GooeyTooltip from "../Tooltip";
import {
  ConversationsSkeleton,
  ServerConversationLink,
  useServerConversations,
} from "./ServerConversations";

const SideNavbar = () => {
  const {
    conversations,
    setActiveConversation,
    currentConversation,
    handleNewConversation,
    messages,
  } = useMessagesContext();
  const currentConversationId = currentConversation?.id || null;
  const { layoutController, config } = useSystemContext();
  const branding = config?.branding;
  const fetchConversations = config?.controller?.fetchConversations;
  const { serverConversations, isServerConversationsLoading, isServerMode } =
    useServerConversations({
      fetchConversations,
      isSidebarOpen: !!layoutController?.isSidebarOpen,
    });
  const effectiveConversations: Conversation[] | null | undefined = isServerMode
    ? serverConversations
    : conversations;

  const closeDrawersAfterConversationClick = () => {
    if (layoutController?.isNarrowWidth) layoutController?.toggleSidebar();
    if (layoutController?.isSecondaryDrawerOpen)
      layoutController?.toggleSecondaryDrawer(null);
  };

  const handleConversationClick = (conversation: Conversation) => {
    setActiveConversation?.(conversation);
    closeDrawersAfterConversationClick();
  };

  const conversationsList = React.useMemo(
    () => groupConversationsByDate(effectiveConversations),
    [effectiveConversations],
  );

  if (!layoutController?.showNewConversationButton) return null;
  const isEmpty = !messages?.size;

  return (
    <nav
      id="gooey-side-navbar"
      style={{
        transition: "width ease-in-out 0.2s",
        width: layoutController?.isSidebarOpen ? "260px" : "0px",
        zIndex: 10,
      }}
      className={clsx(
        "h-100 overflow-x-hidden top-0 left-0 bg-grey d-flex flex-col",
        layoutController?.isNarrowWidth ? "pos-absolute" : "pos-relative",
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
          {isServerMode &&
          (isServerConversationsLoading || serverConversations === null) ? (
            <ConversationsSkeleton />
          ) : conversationsList.length === 0 ? (
            <div className="h-100 gpb-30 d-flex align-center justify-center">
              <p className="gmb-30 text-muted text-center font_14_400">
                No conversations yet
              </p>
            </div>
          ) : (
            <div className="gp-8 flex-1 h-100">
              {conversationsList.map((group) => (
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
                      .map((conversation: Conversation, idx: number) => {
                        if (isServerMode) {
                          return (
                            <li key={conversation.url || idx}>
                              <ServerConversationLink
                                conversation={conversation}
                                onClick={closeDrawersAfterConversationClick}
                              />
                            </li>
                          );
                        } else {
                          return (
                            <li key={conversation.id}>
                              <ConversationButton
                                conversation={conversation}
                                isActive={
                                  currentConversationId === conversation?.id
                                }
                                onClick={() =>
                                  handleConversationClick(conversation)
                                }
                              />
                            </li>
                          );
                        }
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

type ConversationGroup = {
  subheading: string;
  conversations: Conversation[];
};

const groupConversationsByDate = (
  conversations?: Conversation[] | null,
): ConversationGroup[] => {
  if (!conversations || conversations.length === 0) return [];

  const now = new Date().getTime();
  const today = new Date().setHours(0, 0, 0, 0);
  const endToday = new Date().setHours(23, 59, 59, 999);
  const yesterday = new Date(today - 1).setHours(0, 0, 0, 0);
  const endYesterday = new Date(today - 1).setHours(23, 59, 59, 999);
  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

  const grouped: Record<string, Conversation[]> = {
    Today: [],
    Yesterday: [],
    "Previous 7 Days": [],
    "Previous 30 Days": [],
  };
  const monthGroups: Record<string, Conversation[]> = {};

  conversations.forEach((conversation) => {
    const lastMessageTimestamp = new Date(
      conversation.timestamp as string,
    ).getTime();

    if (lastMessageTimestamp >= today && lastMessageTimestamp <= endToday) {
      grouped.Today.unshift(conversation);
      return;
    }
    if (
      lastMessageTimestamp >= yesterday &&
      lastMessageTimestamp <= endYesterday
    ) {
      grouped.Yesterday.unshift(conversation);
      return;
    }
    if (
      lastMessageTimestamp > endToday - sevenDaysInMs &&
      lastMessageTimestamp <= endToday
    ) {
      grouped["Previous 7 Days"].unshift(conversation);
      return;
    }
    if (now - lastMessageTimestamp <= thirtyDaysInMs) {
      grouped["Previous 30 Days"].unshift(conversation);
      return;
    }

    const monthName = new Date(lastMessageTimestamp).toLocaleString("default", {
      month: "long",
    });
    monthGroups[monthName] ||= [];
    monthGroups[monthName].push(conversation);
  });

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
    ...Object.entries(monthGroups).map(([monthName, conversations]) => ({
      subheading: monthName,
      conversations,
    })),
  ].filter((group) => group.conversations.length > 0);
};

// Memoized component for individual conversation buttons
const ConversationButton: React.FC<{
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}> = React.memo(({ conversation, isActive, onClick }) => {
  // use timestamp in day, time format for title if no message is present
  const title = getConversationTitle(conversation);
  return (
    <Button
      className="w-100 gp-8 gmb-6 text-left"
      variant={isActive ? "filled" : "text-alt"}
      onClick={onClick}
      hideOverflow
    >
      <p className="font_14_400">{title}</p>
    </Button>
  );
});

export const getConversationTitle = (conversation: Conversation) => {
  if (conversation.title) return conversation.title;
  if (!conversation.timestamp) return "Untitled";

  return new Date(conversation.timestamp).toLocaleString("default", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export default SideNavbar;
