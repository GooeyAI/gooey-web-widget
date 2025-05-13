// Import all css classes
import CssLibrary from "src/css/root.scss?inline";
import AppStyles from "src/css/App.css?inline";

addInlineStyle(CssLibrary);
addInlineStyle(AppStyles);

// Import all components
import ChatInput, {
  OnSendCallbackType,
} from "src/widgets/copilot/components/ChatInput";
import { createPortal } from "react-dom";
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addInlineStyle, Styles } from "src/addStyles";
import Header from "src/widgets/copilot/components/Header";
import { CopilotConfigType } from "src/contexts/types";
import ConversationView from "../ConversationView";
import SecondaryDrawer from "../shared/Layout/SecondaryDrawer";
import useSecondaryDrawerController from "src/hooks/useSecondaryDrawerController";

// Define a Message type to avoid 'any'
export interface Message {
  id?: string;
  bot_message_id?: string;
  [key: string]: unknown;
}

export interface GooeyChatWidgetProps {
  messages: Message[];
  isSending: boolean;
  config: Record<string, unknown>;
  onSend: OnSendCallbackType;
  onCancelSend: () => void;
  onNewConversation: () => void;
}

// Move WidgetComponent outside the main component to avoid re-creation on every render
const WidgetComponent = (props: {
  messages_map: Map<string, Message>;
  isSending: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  preventAutoplay: boolean;
  avoidAutoplay: () => void;
  safeConfig: CopilotConfigType;
  handleNewConversation: () => void;
  handleSend: OnSendCallbackType;
  handleCancelSend: () => void;
  isSecondaryDrawerOpen: boolean;
  secondaryDrawerContent: () => ReactNode;
  toggleSecondaryDrawer: (content: (() => ReactNode) | null) => void;
}) => {
  const {
    messages_map,
    isSending,
    scrollContainerRef,
    preventAutoplay,
    avoidAutoplay,
    safeConfig,
    handleNewConversation,
    handleSend,
    handleCancelSend,
    isSecondaryDrawerOpen,
    secondaryDrawerContent,
    toggleSecondaryDrawer,
  } = props;
  return (
    <div
      className="gooey-embed-container d-flex flex-col h-100 flex-1 pos-relative"
      id="gooeyChat-container"
    >
      <Header
        isEmptyMessages={messages_map.size === 0}
        showNewConversationButton={true}
        name={safeConfig?.branding?.name || ""}
        photoUrl={safeConfig?.branding?.photoUrl || ""}
        onNewConversation={handleNewConversation}
        disableTooltip={true}
      />
      <ConversationView
        messages={messages_map}
        onSend={handleSend}
        isSending={isSending}
        scrollContainerRef={scrollContainerRef}
        preventAutoplay={preventAutoplay}
        avoidAutoplay={avoidAutoplay}
        config={safeConfig}
        layoutController={{
          toggleSecondaryDrawer,
        }}
      />
      <ChatInput
        config={safeConfig}
        isSending={isSending}
        isReceiving={isSending}
        onSend={handleSend}
        onCancelSend={handleCancelSend}
      />
      <SecondaryDrawer
        isMobile={true}
        isOpen={isSecondaryDrawerOpen}
        contentRenderer={secondaryDrawerContent}
      />
    </div>
  );
};

const GooeyChatWidget: React.FC<GooeyChatWidgetProps> = (props) => {
  const {
    messages = [],
    isSending = false,
    config,
    onSend,
    onCancelSend,
    onNewConversation,
  } = props;

  const [preventAutoplay, setPreventAutoplay] = useState<boolean>(true);

  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isShadowRootReady, setIsShadowRootReady] = useState(false);

  const {
    isSecondaryDrawerOpen,
    secondaryDrawerContent,
    toggleSecondaryDrawer,
  } = useSecondaryDrawerController();

  const messages_map = useMemo(() => {
    const _map = new Map<string, Message>();
    messages.forEach((message: Message) => {
      _map.set((message.id || message.bot_message_id) ?? '', message);
    });
    return _map;
  }, [messages]);

  const avoidAutoplay = () => {
    setPreventAutoplay(true);
    setTimeout(() => {
      setPreventAutoplay(false);
    }, 3000);
  };

  // Safe defaults
  function extractBranding(obj: unknown): Record<string, unknown> {
    if (typeof obj === 'object' && obj !== null && 'branding' in obj) {
      const branding = (obj as { branding?: unknown }).branding;
      if (typeof branding === 'object' && branding !== null) {
        return branding as Record<string, unknown>;
      }
    }
    return {};
  }
  const safeConfig: CopilotConfigType = {
    ...((typeof config === 'object' && config !== null) ? config : {}),
    branding: {
      name: "Gooey Bot",
      photoUrl: "https://gooey.ai/favicon.ico",
      ...extractBranding(config),
    },
  } as CopilotConfigType;

  const handleSend: OnSendCallbackType = useCallback((msg) => {
    if (onSend) {
      onSend(msg);
    } else {
      console.log("Send message pressed!, No Callback received", msg);
    }
  },
    [onSend]
  );

  const handleCancelSend = useCallback(
    () => {
      if (onCancelSend) {
        onCancelSend();
      } else {
        console.log("Cancel send pressed!, No Callback received");
      }
    },
    [onCancelSend]
  );

  const handleNewConversation = useCallback(() => {
    if (onNewConversation) {
      onNewConversation();
    } else {
      console.log("New conversation pressed!, No Callback received");
    }
  },
    [onNewConversation]
  );

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log("hostRef.current", hostRef.current);
    if (hostRef.current && !shadowRootRef.current) {
      if (!hostRef.current.shadowRoot) {
        shadowRootRef.current = hostRef.current.attachShadow({
          mode: "open",
          delegatesFocus: true,
        });
      } else {
        shadowRootRef.current = hostRef.current.shadowRoot;
      }
      setIsShadowRootReady(true);
    }
  }, []);

  // Only render the portal if the shadow root is ready
  console.log(isSending, ">>");
  return (
    <span ref={hostRef} style={{ display: "contents" }}>
      {isShadowRootReady &&shadowRootRef.current &&
        createPortal(
          <>
            <Styles />
            <WidgetComponent
              messages_map={messages_map}
              isSending={isSending}
              scrollContainerRef={scrollContainerRef}
              preventAutoplay={preventAutoplay}
              avoidAutoplay={avoidAutoplay}
              safeConfig={safeConfig}
              handleNewConversation={handleNewConversation}
              handleSend={handleSend}
              handleCancelSend={handleCancelSend}
              isSecondaryDrawerOpen={isSecondaryDrawerOpen}
              secondaryDrawerContent={secondaryDrawerContent}
              toggleSecondaryDrawer={toggleSecondaryDrawer}
            />
          </>,
          shadowRootRef.current
        )}
    </span>
  );
};

export default GooeyChatWidget;