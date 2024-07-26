import { ReactNode, createContext, useState } from "react";
import { CopilotConfigType } from "./types";

export type SystemContextType = {
  open: boolean;
  mode?: string;
  config?: CopilotConfigType;
  isExpanded?: boolean;
  toggleWidget?: () => void;
  setTempStoreValue?: (key: string, value: any) => void;
  getTempStoreValue?: (key: string) => any;
  expandWidget?: () => void;
};

export const SystemContext = createContext<SystemContextType>({ open: false });

interface SystemContextState {
  open: boolean;
  isInitialized: boolean;
  config?: CopilotConfigType;
}

const getMode = (state: SystemContextState) => {
  if (!state.isInitialized && !state.open) return "off";
  if (state.isInitialized && !state.open) return "standby";
  if (state.isInitialized && state.open) return "on";
  return "unknown";
};

const SystemContextProvider = ({
  config,
  children,
}: {
  config: CopilotConfigType;
  children: ReactNode;
}) => {
  const [widgetState, setWidgetState] = useState<SystemContextState>({
    open: false,
    isInitialized: false,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempStore, setTempStore] = useState<any>(new Map());

  const handleWidgetToggle = () => {
    if (!widgetState.open)
      return setWidgetState((prev) => ({
        ...prev,
        open: true,
        isInitialized: true,
      }));
    setIsExpanded(false);
    return setWidgetState((prev) => ({ ...prev, open: false }));
  };

  const setTempStoreValue = (key: string, value: any) => {
    setTempStore((prev: any) => {
      const newStore = new Map(prev);
      newStore.set(key, value);
      return newStore;
    });
  };

  const getTempStoreValue = (key: string) => {
    return tempStore.get(key);
  };

  const expandWidget = () => {
    const shadowRoot = document.querySelector((config?.target || "") as string)
      ?.firstElementChild?.shadowRoot;
    const ele = shadowRoot?.getElementById("gooey-popup-container");
    if (!isExpanded) ele?.classList.add("gooey-expanded-popup");
    else ele?.classList.remove("gooey-expanded-popup");
    setIsExpanded((prev) => !prev);
  };

  const value: SystemContextType = {
    open: widgetState.open,
    mode: getMode(widgetState),
    toggleWidget: handleWidgetToggle,
    config: config,
    setTempStoreValue,
    getTempStoreValue,
    isExpanded,
    expandWidget,
  };

  return (
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
  );
};

export default SystemContextProvider;
