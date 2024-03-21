import { createContext, useCallback, useState } from "react";
import { useMessagesContext } from "./hooks";

export const SystemContext = createContext({});
interface SystemContextState {
  open: boolean;
  isInitialized: boolean;
}

const getMode = (state: SystemContextState) => {
  if (!state.isInitialized && !state.open) return "off";
  if (state.isInitialized && !state.open) return "standby";
  if (state.isInitialized && state.open) return "on";
};

const SystemContextProvider = (props: any) => {
  const { bot_profile } = props;
  const { messages, flushData }: any = useMessagesContext();
  const [widgetState, setWidgetState] = useState<SystemContextState>({
    open: false,
    isInitialized: false,
  });

  const mode = getMode(widgetState);

  // const handleWidgetChange = (val: boolean, payload?: any) => {
  //   if (payload) {
  //     const data = JSON.parse(payload);
  //     if (data.isInitialized) preLoadData(data.data);
  //   }
  //   setWidgetState((prev) => ({
  //     ...prev,
  //     open: val,
  //     isInitialized: true,
  //   }));
  // };

  // const receiveMessage = (event: any) => {
  //   if (event && event.data.type === "DOM_MAXIMIZE_WIDGET_DONE")
  //     handleWidgetChange(true, event.data.payload);
  //   if (event && event.data.type === "DOM_MINIMIZE_WIDGET_DONE")
  //     handleWidgetChange(false);
  // };

  const handleWidgetToggle = useCallback(() => {
    if (!widgetState.open) {
      // open widget
      return setWidgetState((prev) => ({ ...prev, open: true }));
    }
    // minimize widget
    // const newData = Array.from(messages.values());
    flushData();
    return setWidgetState((prev) => ({
      ...prev,
      open: false,
      isInitialized: true,
    }));
  }, [widgetState.open, messages, flushData]);

  // useEffect(() => {
  //   window.addEventListener("message", receiveMessage);
  //   return () => window.removeEventListener("message", receiveMessage);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const value = {
    open: widgetState.open,
    mode,
    toggleWidget: handleWidgetToggle,
    botProfile: bot_profile,
  };
  return (
    <SystemContext.Provider value={value}>
      {props.children}
    </SystemContext.Provider>
  );
};

export default SystemContextProvider;
