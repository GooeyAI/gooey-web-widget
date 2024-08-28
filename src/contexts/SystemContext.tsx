import { ReactNode, createContext, useEffect, useState } from "react";
import { CopilotConfigType } from "./types";
import useMediaQuery from "src/hooks/useMediaQuery";

interface LayoutController extends LayoutStateType {
  toggleOpenClose: () => void;
  toggleSidebar: () => void;
  toggleFocusMode: () => void;
  setState: (state: any) => void;
}

type LayoutStateType = {
  isOpen: boolean;
  isFocusMode: boolean;
  isInline: boolean;
  isMobile: boolean;

  isSidebarOpen: boolean;
  showCloseButton: boolean;
  showSidebarButton: boolean;
  showFocusModeButton: boolean;
  widgetRootElement?: HTMLElement;
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
    showSidebarButton: true,
    showFocusModeButton: !isInline || false,
    isMobile: false,
  });
  const isMobile = useMediaQuery("mobile", [layoutState?.isOpen]);

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

  useEffect(() => {
    // set initial state based on isMobile and isInline
    setLayoutState((prev) => ({
      ...prev,
      isSidebarOpen: !isMobile,
      showSidebarButton: isMobile,
      isMobile,
    }));
  }, [isMobile]);

  const LayoutController: LayoutController = {
    toggleOpenClose: () => {
      // open/close in pop-up mode
      setLayoutState((prev) => ({
        ...prev,
        isOpen: !prev.isOpen,
        isFocusMode: false,
        isSidebarOpen: false,
        showSidebarButton: true,
      }));
    },
    toggleSidebar: () => {
      setLayoutState((prev: any) => {
        const sideBarElement: HTMLElement | null | undefined =
          gooeyShadowRoot?.querySelector("#gooey-side-navbar");
        if (!sideBarElement) return;
        // set width to 0px if sidebar is closed
        if (!prev.isSidebarOpen) {
          sideBarElement.style.width = "260px";
        } else {
          sideBarElement.style.width = "0px";
        }
        return {
          ...prev,
          isSidebarOpen: !prev.isSidebarOpen,
          showSidebarButton: prev.isSidebarOpen,
        };
      });
    },
    toggleFocusMode: () => {
      setLayoutState((prev) => ({
        ...prev,
        isFocusMode: !prev.isFocusMode,
        isSidebarOpen: true,
      }));
    },
    setState: (state: any) => {
      setLayoutState((prev) => ({
        ...prev,
        ...state,
      }));
    },
    ...layoutState,
  };

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
