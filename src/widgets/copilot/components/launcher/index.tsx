
import "./launcher.scss";
import { useSystemContext } from "src/contexts/hooks";

const Launcher = () => {
  const { toggleWidget, botProfile }: any = useSystemContext();
  return (
    <div
      style={{
        bottom: 0,
        right: 0,
      }}
      className="pos-fixed pb-16 pr-16"
    >
      <button
        onClick={toggleWidget}
        className="gooeyChat-launchButton hover-grow cr-pointer bx-shadowA button-hover"
        style={{ height: "56px", width: "56px", borderRadius: "50%"}}
      >
        <img src={botProfile?.display_picture} className="logo react" alt="React logo" style={{ objectFit: 'contain', width : '100%'}}/>
      </button>
    </div>
  );
};

export default Launcher;
