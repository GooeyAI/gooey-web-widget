import "./launcher.scss";
import { useSystemContext } from "src/contexts/hooks";

const Launcher = () => {
  const { toggleWidget, config }: any = useSystemContext();
  const { bot_profile, icon_text } = config;
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
        style={{ borderRadius: "30px", padding: 0 }}
      >
        {!!icon_text && <p className="font_16_600 p-12">{icon_text}</p>}
        <img
          src={bot_profile?.display_picture}
          alt="Copilot logo"
          style={{
            objectFit: "contain",
            borderRadius: "50%",
            width: "56px",
            height: "56px",
          }}
        />
      </button>
    </div>
  );
};

export default Launcher;
