import brandLogo from "src/assets/brand-logo.svg";
import "./launcher.scss";
import { useSystemContext } from "src/contexts/hooks";

const Launcher = () => {
  const { toggleWidget }: any = useSystemContext();
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
        className="gooeyChat-launchButton hover-grow cr-pointer br-large bx-shadowA bg-darkGrey button-hover"
        style={{ height: "56px", width: "56px" }}
      >
        <img src={brandLogo} className="logo react" alt="React logo" />
      </button>
    </div>
  );
};

export default Launcher;
