import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { CopilotConfigType } from "./types";
import useDeviceWidth from "src/hooks/useDeviceWidth";

// eslint-disable-next-line react-refresh/only-export-components
const toggleSidebarStyles = (
  isSidebarOpen: boolean,
  sidebarName: "left" | "right" = "left",
  isMobile: boolean = false,
) => {
  if (sidebarName === "right") {
    const sideBarElement: HTMLElement | null | undefined =
      gooeyShadowRoot?.querySelector("#gooey-right-bar");
    if (!sideBarElement) return;
    // set width to 0px if sidebar is closed
    if (!isSidebarOpen) {
      sideBarElement.style.width = isMobile ? "100%" : "65vw";
    } else {
      sideBarElement.style.width = "0px";
    }
  } else {
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
  }
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
  isInline: boolean;
  isMobile: boolean;

  isSidebarOpen: boolean;
  isSecondaryDrawerOpen: boolean;
  secondaryDrawerContent: () => ReactNode | null;
  showCloseButton: boolean;
  showSidebarButton: boolean;
  showFocusModeButton: boolean;
  showNewConversationButton?: boolean;
};

export type SystemContextType = {
  config?: CopilotConfigType;
  setTempStoreValue?: (key: string, value: any) => void;
  getTempStoreValue?: (key: string) => any;
  layoutController?: LayoutController;
};

export const SystemContext = createContext<SystemContextType>({});

const SystemContextProvider = ({
  config,
  children,
}: {
  config: CopilotConfigType;
  children: ReactNode;
}) => {
  const isInline = config?.mode === "inline" || config?.mode === "fullscreen";
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
      config?.enableConversations === undefined
        ? true
        : config?.enableConversations,
    isMobile: false,
    isSecondaryDrawerOpen: false,
    secondaryDrawerContent: () => null,
  });
  const forceHideSidebar = !layoutState?.showNewConversationButton;
  const [isMobile, isMobileWindow] = useDeviceWidth("mobile", [
    layoutState?.isOpen,
  ]);

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
        setLayoutState((prev: any) => {
          toggleSidebarStyles(prev.isSidebarOpen);
          return {
            ...prev,
            isSidebarOpen: !prev.isSidebarOpen,
            showSidebarButton: prev.isSidebarOpen,
          };
        });
      },
      toggleFocusMode: () => {
        setLayoutState((prev) => {
          const sideBarElement: HTMLElement | null | undefined =
            gooeyShadowRoot?.querySelector("#gooey-side-navbar");
          if (!sideBarElement)
            return { ...prev, isFocusMode: !prev.isFocusMode };
          if (!prev?.isFocusMode) {
            // turning on focus mode open sidebar
            if (!prev?.isSidebarOpen) sideBarElement.style.width = "260px";
            return {
              ...prev,
              isFocusMode: true,
              isSidebarOpen: forceHideSidebar ? false : true,
              showSidebarButton: forceHideSidebar ? false : prev.isSidebarOpen,
            };
          } else {
            // turning off focus mode
            if (prev?.isSidebarOpen) sideBarElement.style.width = "0px";
            return {
              ...prev,
              isFocusMode: false,
              isSidebarOpen: forceHideSidebar ? false : false,
              showSidebarButton: forceHideSidebar ? false : prev.isSidebarOpen,
            };
          }
        });
      },
      toggleSecondaryDrawer: (data = null) => {
        setLayoutState((prev: any) => {
          const triggerSidebar =
            data && prev.isSidebarOpen && !prev.isSecondaryDrawerOpen;
          if (triggerSidebar) toggleSidebarStyles(prev.isSidebarOpen);
          if ((data && !prev.isSecondaryDrawerOpen) || !data)
            // open / close secondary drawer
            toggleSidebarStyles(
              prev.isSecondaryDrawerOpen,
              "right",
              prev.isMobile,
            );
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

  useEffect(() => {
    // set initial state based on isMobile and isInline
    setLayoutState((prev) => ({
      ...prev,
      isSidebarOpen: !isMobile,
      showSidebarButton: forceHideSidebar ? false : isMobile,
      showFocusModeButton: isInline
        ? false
        : (isMobile && !isMobileWindow) || (!isMobile && !isMobileWindow),
      isMobile,
      isMobileWindow,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceHideSidebar, isInline, isMobile, isMobileWindow]);

  const value: SystemContextType = {
    config: config,
    setTempStoreValue,
    getTempStoreValue,
    layoutController: LayoutController,
  };

  return (
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
  );
};

export default SystemContextProvider;
