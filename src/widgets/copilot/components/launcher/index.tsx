import clsx from "clsx";
import "./launcher.scss";
import { useSystemContext } from "src/contexts/hooks";

const Launcher = () => {
  const { toggleWidget, config }: any = useSystemContext();
  const { bot_profile, widget_text } = config;
  const iconSize = widget_text ? 36 : 56;
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
        className={clsx(
          "gooeyChat-launchButton hover-grow cr-pointer bx-shadowA button-hover bg-white",
          widget_text && "pl-6 pt-6 pb-6 "
        )}
        style={{ borderRadius: "30px", padding: 0 }}
      >
        <img
          src={bot_profile?.display_picture}
          alt="Copilot logo"
          style={{
            objectFit: "contain",
            borderRadius: "50%",
            width: iconSize + "px",
            height: iconSize + "px",
          }}
        />
        {!!widget_text && <p className="font_16_600 p-8">{widget_text}</p>}
      </button>
    </div>
  );
};

export default Launcher;
