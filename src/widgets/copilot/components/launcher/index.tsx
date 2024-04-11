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
      className="pos-fixed gpb-16 gpr-16"
    >
      <button
        onClick={toggleWidget}
        className={clsx(
          "gooeyChat-launchButton hover-grow cr-pointer bx-shadowA button-hover bg-white",
          widget_text && "gpl-6 gpt-6 gpb-6 "
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
        {!!widget_text && <p className="font_16_600 gp-8">{widget_text}</p>}
      </button>
    </div>
  );
};

export default Launcher;
