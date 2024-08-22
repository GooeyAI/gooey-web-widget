import { ReactNode, createContext, useState } from "react";
import { CopilotConfigType } from "./types";

interface LayoutController extends LayoutStateType {
  toggleOpenClose: () => void;
  toggleSidebar: () => void;
  toggleFocusMode: () => void;
}

type LayoutStateType = {
  isOpen: boolean;
  isFocusMode: boolean;
  isInline: boolean;

  showSidebar: boolean;
  showCloseButton: boolean;
  showSidebarButton: boolean;
  showFocusModeButton: boolean;
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
    showSidebar: true,
    showCloseButton: !isInline || false,
    showSidebarButton: true,
    showFocusModeButton: !isInline || false,
  });

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

  const LayoutController: LayoutController = {
    toggleOpenClose: () => {
      setLayoutState((prev) => ({ ...prev, isOpen: !prev.isOpen, isFocusMode: false }));
    },
    toggleSidebar: () => {
      setLayoutState((prev) => ({ ...prev, showSidebar: !prev.showSidebar }));
    },
    toggleFocusMode: () => {
      setLayoutState((prev) => ({ ...prev, isFocusMode: !prev.isFocusMode }));
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
