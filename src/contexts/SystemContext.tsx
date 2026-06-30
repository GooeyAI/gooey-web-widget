import {
  ReactNode,
  createContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { CopilotConfigType } from "./types";
import useDeviceWidth from "src/hooks/useDeviceWidth";
import type { CopilotChatWidgetController } from "./ControllerUtils";

const isGooeyChatAppFromURL = (integrationId: string) => {
  // match chat/{integartion-name}-{integrationId}/*
  const regex = new RegExp(`^/chat/[^/]+-${integrationId}(?:/share/[^/]+)?/?$`);
  return window.location.pathname.match(regex) ? true : false;
};

interface LayoutController extends LayoutStateType {
  toggleOpenClose: () => void;
  toggleSidebar: () => void;
  toggleFocusMode: () => void;
  toggleSecondaryDrawer: (data: Record<string, any> | null) => void;
  setState: (state: any) => void;
}

type LayoutStateType = {
  isOpen: boolean;
  isFocusMode: boolean;
  isInline: boolean; // true - when widget is mounted in fullscreen / inline mode
  isNarrowWidth: boolean; // true - when widget container is <= mobile width 768px
  isGooeyChatApp: boolean; // true - when widget is mounted in gooey chat widget site (chat/name-{integrationId})

  isSidebarOpen: boolean;
  isSecondaryDrawerOpen: boolean;
  secondaryDrawerContent: () => ReactNode | null;
  showCloseButton: boolean;
  showSidebarButton: boolean;
  showFocusModeButton: boolean;
  showNewConversationButton?: boolean;
};

type CopilotConfigWithController = CopilotConfigType & {
  controller?: CopilotChatWidgetController;
};

export type SystemContextType = {
  config?: CopilotConfigWithController;
  setTempStoreValue?: (key: string, value: any) => void;
  getTempStoreValue?: (key: string) => any;
  layoutController?: LayoutController;
};

export const SystemContext = createContext<SystemContextType>({});

const SystemContextProvider = ({
  config,
  children,
  shadowRoot,
  controller,
}: {
  config: CopilotConfigWithController;
  children: ReactNode;
  shadowRoot?: ShadowRoot;
  controller?: CopilotChatWidgetController;
}) => {
  const [configState, setConfigState] = useState<CopilotConfigWithController>({
    ...config,
    controller: config.controller ?? controller,
  });
  const isInline =
    configState?.mode === "inline" || configState?.mode === "fullscreen";
  const [tempStore, setTempStore] = useState<Map<string, any>>(new Map());
  const [layoutState, setLayoutState] = useState<LayoutStateType>({
    isOpen: isInline || false,
    isFocusMode: false,
    isInline,
    isSidebarOpen: false,
    showCloseButton: !isInline || false,
    showSidebarButton: false,
    showFocusModeButton: !isInline || false,
    showNewConversationButton:
      configState?.enableConversations === undefined
        ? true
        : configState?.enableConversations,
    isNarrowWidth: false,
    isSecondaryDrawerOpen: false,
    secondaryDrawerContent: () => null,
    isGooeyChatApp: false,
  });
  const forceHideSidebar = !layoutState?.showNewConversationButton;
  // Re-measure when the popup opens: in popup mode `#gooeyChat-container`
  // (the 460px-wide element useDeviceWidth measures) is only mounted once
  // `isOpen` is true, so without this dep the width is read while the popup
  // is still closed and isNarrowWidth stays false — collapsing the sidebar overlay.
  const [isNarrowWidth, isNarrowWindowWidth] = useDeviceWidth(
    shadowRoot,
    "mobile",
    [layoutState?.isOpen],
  );

  const setTempStoreValue = (key: string, value: any) => {
    setTempStore((prev: Map<string, any>) => {
      const newStore = new Map(prev);
      newStore.set(key, value);
      return newStore;
    });
  };

  const getTempStoreValue = (key: string) => {
    return tempStore.get(key);
  };
  const LayoutController: LayoutController = useMemo(
    () => ({
      toggleOpenClose: () => {
        // open/close in pop-up mode
        setLayoutState((prev) => ({
          ...prev,
          isOpen: !prev.isOpen,
          isFocusMode: false,
          isSidebarOpen: false,
          showSidebarButton: forceHideSidebar ? false : true,
        }));
      },
      toggleSidebar: () => {
        if (forceHideSidebar) return;
        setLayoutState((prev: any) => ({
          ...prev,
          isSidebarOpen: !prev.isSidebarOpen,
          showSidebarButton: prev.isSidebarOpen,
        }));
      },
      toggleFocusMode: () => {
        setLayoutState((prev) => {
          if (!prev?.isFocusMode) {
            // turning on focus mode opens the sidebar
            return {
              ...prev,
              isFocusMode: true,
              isSidebarOpen: forceHideSidebar ? false : true,
              showSidebarButton: forceHideSidebar ? false : prev.isSidebarOpen,
            };
          } else {
            // turning off focus mode closes the sidebar
            return {
              ...prev,
              isFocusMode: false,
              isSidebarOpen: false,
              showSidebarButton: forceHideSidebar ? false : prev.isSidebarOpen,
            };
          }
        });
      },
      toggleSecondaryDrawer: (data = null) => {
        setLayoutState((prev: any) => {
          if (!data && !prev?.isSecondaryDrawerOpen) return prev;
          // opening the right drawer collapses the left sidebar to make room
          const triggerSidebar =
            data && prev.isSidebarOpen && !prev.isSecondaryDrawerOpen;
          return {
            ...prev,
            isSecondaryDrawerOpen: data ? true : false,
            secondaryDrawerContent: data,
            isSidebarOpen: triggerSidebar
              ? !prev.isSidebarOpen
              : prev.isSidebarOpen,
            showSidebarButton: triggerSidebar
              ? prev.isSidebarOpen
              : prev.showSidebarButton,
          };
        });
      },
      setState: (state: any) => {
        setLayoutState((prev) => ({
          ...prev,
          ...state,
        }));
      },
      ...layoutState,
    }),
    [setLayoutState, forceHideSidebar, layoutState],
  );

  useLayoutEffect(() => {
    // set initial state based on isNarrowWidth and isInline
    setLayoutState((prev) => ({
      ...prev,
      isSidebarOpen: !isNarrowWidth,
      showSidebarButton: forceHideSidebar ? false : isNarrowWidth,
      showFocusModeButton: isInline
        ? false
        : (isNarrowWidth && !isNarrowWindowWidth) || (!isNarrowWidth && !isNarrowWindowWidth),
      isNarrowWidth,
      isNarrowWindowWidth,
      isGooeyChatApp: isGooeyChatAppFromURL(configState?.integration_id || ""),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceHideSidebar, isInline, isNarrowWidth, isNarrowWindowWidth]);

  if (controller)
    controller.updateConfig = (next: CopilotConfigType) => {
      setConfigState((prev) => ({
        ...prev,
        ...next,
        branding: {
          ...(prev.branding || {}),
          ...(next.branding || {}),
        },
      }));
    };

  const value: SystemContextType = {
    config: configState,
    setTempStoreValue,
    getTempStoreValue,
    layoutController: LayoutController,
  };

  return (
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
  );
};

export default SystemContextProvider;
