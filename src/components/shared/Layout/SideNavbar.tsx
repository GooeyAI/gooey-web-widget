import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import IconButton from "../Buttons/IconButton";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import Button from "../Buttons/Button";
import clsx from "clsx";
import useDeviceWidth from "src/hooks/useDeviceWidth";
import { MOBILE_WIDTH } from "src/utils/constants";
import { Conversation } from "src/contexts/ConversationLayer";
import React from "react";
import { CHAT_INPUT_ID } from "src/widgets/copilot/components/ChatInput";

const SideNavbar = () => {
  const {
    conversations,
    setActiveConversation,
    currentConversationId,
    handleNewConversation,
  }: any = useMessagesContext();
  const { layoutController, config } = useSystemContext();
  const width = useDeviceWidth();
  const isMobile = width < MOBILE_WIDTH;
  const isOpen = layoutController?.isSidebarOpen;
  const branding = config?.branding;

  // Function to render conversation subheadings based on date
  const renderConversationSubheading = (timestamp: number) => {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000); // 86400000 milliseconds in a day
    const date = new Date(timestamp);
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Sort conversations by the latest timestamp of their messages
  // Group conversations by date
  const groupedConversations = React.useMemo(() => {
    const sortedConversations = conversations.sort(
      (a: Conversation, b: Conversation) => {
        const lastMessageA = a.messages?.[a.messages.length - 1];
        const lastMessageB = b.messages?.[b.messages.length - 1];
        const timestampA = lastMessageA
          ? new Date(lastMessageA.timestamp).getTime()
          : 0;
        const timestampB = lastMessageB
          ? new Date(lastMessageB.timestamp).getTime()
          : 0;
        return timestampB - timestampA; // Sort in descending order
      }
    );

    // Function to render subheading for each group
    return sortedConversations.reduce(
      (acc: any, conversation: Conversation) => {
        const lastMessageTimestamp = new Date(
          conversation!.timestamp as string
        ).getTime();
        const subheading = renderConversationSubheading(lastMessageTimestamp);

        // Find the index of the subheading in the accumulator array
        const subheadingIndex = acc.findIndex(
          (item: any) => item.subheading === subheading
        );

        if (subheadingIndex === -1) {
          // If the subheading doesn't exist, add a new entry
          acc.push({
            subheading,
            conversations: [conversation],
          });
        } else {
          // If the subheading exists, add the conversation to the existing entry
          acc[subheadingIndex].conversations.push(conversation);
        }

        return acc;
      },
      []
    );
  }, [conversations]);

  return (
    <nav
      style={{
        overflowX: "hidden",
        width: isOpen ? "260px" : "0px",
        transition: "width ease-in-out 0.2s",
        top: 0,
        left: 0,
        height: "100%",
        zIndex: 10,
      }}
      className={clsx(
        "b-1 bg-white h-100 overflow-x-hidden ",
        isMobile ? "pos-absolute" : "pos-relative"
      )}
    >
      {/* Header */}
      <div className="gp-8 d-flex b-btm-1 flex-col pos-sticky">
        <IconButton
          variant="text"
          className="gp-6 cr-pointer"
          onClick={layoutController?.toggleSidebar}
        >
          <IconSidebar size={20} />
        </IconButton>
      </div>

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

      <div className="gpl-20 gmt-20 gpr-20">
        {groupedConversations.map((group: any) => (
          <React.Fragment key={group.subheading}>
            <h5 className="gmb-12 text-muted">{group.subheading}</h5>
            {group.conversations.map((conversation: Conversation) => {
              return (
                <ConversationButton
                  key={conversation.id}
                  conversation={conversation}
                  isActive={currentConversationId === conversation?.id}
                  onClick={() => setActiveConversation(conversation)}
                />
              );
            })}
          </React.Fragment>
        ))}
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
  // Use first 8 words of the last message as title
  const tempTitle: string = lastMessage
    ? (lastMessage?.output_text[0] || lastMessage?.input_prompt || "").slice(
        0,
        8
      )
    : "New Message";
  return (
    <Button
      className="w-100 d-flex gp-8 gmb-12"
      variant={isActive ? "filled" : "text"}
      onClick={onClick}
    >
      <p className="font_14_400">{tempTitle}</p>
    </Button>
  );
});

export default SideNavbar;
