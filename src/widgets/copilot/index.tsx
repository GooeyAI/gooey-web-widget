
import { useSystemContext } from "src/contexts/hooks";
import Launcher from "./components/launcher";
import Widget from "./components/widget";

function ChatWidget() {
  const { open }: any = useSystemContext();
  return (
    <div
      tabIndex={-1}
      role="reigon"
      id=""
      className="pos-relative"
      style={{ height: "100vh", width: "100vw", background: "none", overflow: "auto" }}
    >
      {!open && <Launcher />}
      {open && <Widget />}
    </div>
  );
}

export default ChatWidget;
