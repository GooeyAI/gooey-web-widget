import { ReactNode, createContext, useState } from "react";
import { CopilotConfigType } from "./types";

export type SystemContextType = {
  open: boolean;
  mode: string;
  toggleWidget: () => void;
  config: null | CopilotConfigType;
};

export const SystemContext = createContext<SystemContextType>({
  open: false,
  mode: "off",
  toggleWidget: () => {},
  config: null,
});

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
  const [tempStore, setTempStore] = useState<any>(new Map());

  const mode = getMode(widgetState);
  const handleWidgetToggle = () => {
    if (!widgetState.open)
      return setWidgetState((prev) => ({
        ...prev,
        open: true,
        isInitialized: true,
      }));
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

  const value: {
    open: boolean;
    mode: string;
    toggleWidget: () => void;
    config: CopilotConfigType;
    setTempStoreValue: (key: string, value: any) => void;
    getTempStoreValue: (key: string) => any;
  } = {
    open: widgetState.open,
    mode,
    toggleWidget: handleWidgetToggle,
    config: config,
    setTempStoreValue,
    getTempStoreValue,
  };
  return (
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
  );
};

export default SystemContextProvider;
