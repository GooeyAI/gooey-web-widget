// Import all css classes
import CssLibrary from "src/css/root.scss?inline";
import AppStyles from "src/css/App.css?inline";

addInlineStyle(CssLibrary);
addInlineStyle(AppStyles);

// Import all components
import ChatInput, {
  OnSendCallbackType,
} from "src/widgets/copilot/components/ChatInput";
import ReactDOM from "react-dom/client";
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addInlineStyle, Styles } from "src/addStyles";
import Header from "src/widgets/copilot/components/Header";
import { CopilotConfigType } from "src/contexts/types";
import ConversationView from "../ConversationView";
import SecondaryDrawer from "../shared/Layout/SecondaryDrawer";

export interface GWChatWidgetProps {
  messages: Array<{ id?: string; bot_message_id?: string; [key: string]: any }>;
  isSending: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  config: {
    [key: string]: any;
  };
  onSend: OnSendCallbackType;
  onCancelSend: () => void;
  onNewConversation: () => void;
}

const GWChatWidget: React.FC<GWChatWidgetProps> = (props) => {
  const {
    messages = [],
    isSending = false,
    scrollContainerRef = null,
    config,
    onSend,
    onCancelSend,
    onNewConversation,
  } = props;

  const [preventAutoplay, setPreventAutoplay] = useState<boolean>(true);

  const hostRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<ReactDOM.Root | null>(null);

  console.log(hostRef?.current?.shadowRoot, ">>shadowRoot");
  const {
    isSecondaryDrawerOpen,
    secondaryDrawerContent,
    toggleSecondaryDrawer,
  } = useSecondaryDrawerController({
    isMobile: true,
    shadowRoot: hostRef.current?.shadowRoot,
  });

  const messages_map = useMemo(() => {
    let _map = new Map();
    messages.forEach((message: any) => {
      _map.set(message.id || message.bot_message_id, message);
    });
    return _map;
  }, [JSON.stringify(messages.map((m) => m.id || m.bot_message_id))]);

  const avoidAutoplay = () => {
    setPreventAutoplay(true);
    setTimeout(() => {
      setPreventAutoplay(false);
    }, 3000);
  };

  // Safe defaults
  const safeConfig: CopilotConfigType = {
    ...config,
    branding: {
      name: "Gooey Bot",
      photoUrl: "https://gooey.ai/favicon.ico",
      ...config?.branding,
    },
  } as CopilotConfigType;

  const handleSend = useCallback(
    onSend || ((msg) => console.log("Send message:", msg)),
    [onSend]
  );

  const handleCancelSend = useCallback(
    onCancelSend || (() => console.log("Cancel send")),
    [onCancelSend]
  );

  const handleNewConversation = useCallback(
    onNewConversation || (() => console.log("New conversation")),
    [onNewConversation]
  );

  const WidgetComponent = () => {
    return (
      <div
        className="gooey-embed-container d-flex flex-col h-100 flex-1"
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

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Check if we already created and rendered into a shadow root
    if (host.shadowRoot && rootRef.current) return;

    // Create Shadow DOM if not already created
    const shadow =
      host.shadowRoot ??
      host.attachShadow({
        mode: "open",
        delegatesFocus: true,
      });

    const root = ReactDOM.createRoot(shadow);
    rootRef.current = root;

    root.render(
      <React.StrictMode>
        <Styles />
        <WidgetComponent />
      </React.StrictMode>
    );

    return () => {
      root.unmount();
      rootRef.current = null;
    };
  }, [isSending, messages_map]);

  return <span ref={hostRef} style={{ display: "contents" }} />;
};

export const useSecondaryDrawerController = ({
  isMobile = false,
  shadowRoot = null,
}: {
  isMobile?: boolean;
  shadowRoot?: ShadowRoot | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentRenderer, setContentRenderer] = useState<() => ReactNode>(
    () => null
  );
  console.log(shadowRoot, ">>sideBarElement");
  const toggleSecondaryDrawer = useCallback(
    (content: (() => ReactNode) | null) => {
      const sideBarElement = shadowRoot?.querySelector(
        "#gooey-right-bar"
      ) as HTMLElement;
      console.log(sideBarElement, ">>sideBarElement");
      if (!sideBarElement) return;

      const open = !!content;
      setIsOpen(open);
      setContentRenderer(() => content || (() => null));

      // mimic toggleSidebarStyles logic
      if (open) {
        sideBarElement.style.width = isMobile ? "100%" : "65vw";
      } else {
        sideBarElement.style.width = "0px";
      }
    },
    [isMobile, shadowRoot]
  );

  return {
    isSecondaryDrawerOpen: isOpen,
    secondaryDrawerContent: contentRenderer,
    toggleSecondaryDrawer,
  };
};

export default GWChatWidget;