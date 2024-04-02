import AppLayout from "src/components/shared/Layout/AppLayout";
import "./widget.scss";
import Header from "../Header";
import Messages from "../Messages";
import ChatInput, { CHAT_INPUT_ID } from "../ChatInput";
import { useMessagesContext } from "src/contexts/hooks";

const Widget = () => {
  const { flushData, cancelApiCall }: any = useMessagesContext();
  // const [view, setView] = useState("messages");
  const handleChangeView = () => {
    cancelApiCall();
    flushData();
    let ele = document.getElementById(CHAT_INPUT_ID);
    ele?.focus();
  };
  
  return (
    <main
      id="gooeyChat-widget-container"
      className="bg-white flex-1 d-flex flex-col justify-start overflow-hidden"
    >
      <AppLayout>
        <div
          className="pos-relative d-flex flex-col flex-1"
          style={{ maxHeight: "100%" }}
        >
          <Header onEditClick={handleChangeView} />
          <Messages />
          <ChatInput />
        </div>
      </AppLayout>
    </main>
  );
};

export default Widget;
