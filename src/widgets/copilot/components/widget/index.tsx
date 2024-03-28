import AppLayout from "src/components/shared/Layout/AppLayout";
import "./widget.scss";
import { useState } from "react";
import Header from "../Header";
import Messages from "../Messages";
import ChatInput from "../ChatInput";
import Home from "../Home";

const Widget = () => {
  const [view, setView] = useState("messages");
  const handleChangeView = (val: string) => {
    setView(val);
  };
  return (
    <main
      id="gooeyChat-widget-container"
      className="bg-white flex-1 d-flex flex-col justify-start overflow-hidden"
    >
      <AppLayout onViewChange={handleChangeView} view={view}>
        <>
          {view === "messages" ? (
            <div
              className="pos-relative d-flex flex-col flex-1"
              style={{ maxHeight: "100%" }}
            >
              <Header onViewChange={handleChangeView} />
              <Messages />
              <ChatInput />
            </div>
          ) : null}
          <div>{view === "home" && <Home />}</div>
        </>
      </AppLayout>
    </main>
  );
};

export default Widget;
