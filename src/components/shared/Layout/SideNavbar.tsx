import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import IconButton from "../Buttons/IconButton";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import Button from "../Buttons/Button";
import clsx from "clsx";
import { Conversation } from "src/contexts/ConversationLayer";
import React from "react";
import { CHAT_INPUT_ID } from "src/widgets/copilot/components/ChatInput";
import IconClose from "src/assets/SvgIcons/IconClose";
import IconCollapse from "src/assets/SvgIcons/IconCollapse";
import IconExpand from "src/assets/SvgIcons/IconExpand";

// eslint-disable-next-line react-refresh/only-export-components
export const toggleSidebarStyles = (isSidebarOpen: boolean) => {
  const sideBarElement: HTMLElement | null | undefined =
    gooeyShadowRoot?.querySelector("#gooey-side-navbar");
  if (!sideBarElement) return;
  // set width to 0px if sidebar is closed
  if (!isSidebarOpen) {
    sideBarElement.style.width = "260px";
    sideBarElement.style.transition = "width ease-in-out 0.2s";
  } else {
    sideBarElement.style.width = "0px";
    sideBarElement.style.transition = "width ease-in-out 0.2s";
  }
};

const SideNavbar = () => {
  const {
    conversations,
    setActiveConversation,
    currentConversationId,
    handleNewConversation,
  }: any = useMessagesContext();
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
        conversation.timestamp as string
      ).getTime();
      let subheading: string;

      if (lastMessageTimestamp >= today && lastMessageTimestamp <= endToday) {
        subheading = "Today";
      } else if (
        lastMessageTimestamp >= yesterday && lastMessageTimestamp <= endYesterday
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
          }
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
      })
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

  if (config?.disableConversations) return null;
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
        "b-rt-1 h-100 overflow-x-hidden top-0 left-0 bg-grey",
        layoutController?.isMobile ? "pos-absolute" : "pos-relative"
      )}
    >
      <div
        className="pos-relative overflow-hidden"
        style={{ width: "260px", height: "100%" }}
      >
        {/* Header */}
        <div className="gp-8 b-btm-1 pos-sticky h-header d-flex">
          {/* Close / minimize button */}
          {layoutController?.showCloseButton && layoutController?.isMobile && (
            <IconButton
              variant="text"
              className="gp-4 cr-pointer"
              onClick={layoutController?.toggleOpenClose}
            >
              <IconClose size={24} />
            </IconButton>
          )}
          {/* Focus mode button */}
          {layoutController?.showFocusModeButton &&
            layoutController?.isMobile && (
              <IconButton
                variant="text"
                onClick={layoutController?.toggleFocusMode}
                style={{ transform: "rotate(90deg)" }}
              >
                {layoutController?.isFocusMode ? (
                  <IconCollapse size={16} />
                ) : (
                  <IconExpand size={16} />
                )}
              </IconButton>
            )}

          {/* Sidebar button */}
          <IconButton
            variant="text"
            className="gp-10 cr-pointer"
            onClick={layoutController?.toggleSidebar}
          >
            <IconSidebar size={20} />
          </IconButton>
        </div>

        <div className="overflow-y-auto pos-relative h-100">
          <div className="d-flex flex-col gp-8">
            <Button
              className="w-100 d-flex"
              onClick={() => {
                handleNewConversation();
                const shadowRoot = document.querySelector(
                  (config?.target || "") as string
                )?.firstElementChild?.shadowRoot;
                const ele = shadowRoot?.getElementById(CHAT_INPUT_ID);
                ele?.focus();
              }}
            >
              <div
                className="bot-avatar bg-primary gmr-12"
                style={{ width: "24px", height: "24px", borderRadius: "100%" }}
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
              <p className="font_16_600">{branding?.name}</p>
            </Button>
          </div>

          <div className="gp-8">
            {conversationsList.map((group: any) => (
              <div key={group.subheading} className="gmb-30">
                <div className="pos-sticky top-0 gpt-8 gpb-8 bg-grey">
                  <h5 className="gpl-8 text-muted">{group.subheading}</h5>
                </div>
                <ol>
                  {group.conversations
                    .sort(
                      (a: Conversation, b: Conversation) =>
                        new Date(b.timestamp as string).getTime() -
                        new Date(a.timestamp as string).getTime()
                    )
                    .map((conversation: Conversation) => {
                      return (
                        <li key={conversation.id}>
                          <ConversationButton
                            conversation={conversation}
                            isActive={
                              currentConversationId === conversation?.id
                            }
                            onClick={() => setActiveConversation(conversation)}
                          />
                        </li>
                      );
                    })}
                </ol>
              </div>
            ))}
          </div>
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
  const lastMessage =
    conversation?.messages?.[conversation.messages.length - 1];
  // use timestamp in day, time format for title if no message is present
  const tempTitle = lastMessage?.title
    ? lastMessage.title
    : new Date(conversation.timestamp as string).toLocaleString("default", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  return (
    <Button
      className="w-100 d-flex gp-8 gmb-6"
      variant={isActive ? "filled" : "text-alt"}
      onClick={onClick}
    >
      <p className="font_14_400">{tempTitle}</p>
    </Button>
  );
});

export default SideNavbar;
