import clsx from "clsx";
import { useSystemContext } from "src/contexts/hooks";

import { addInlineStyle } from "src/addStyles";
import style from "./launcher.scss?inline";

addInlineStyle(style);

const Launcher = () => {
  const { config, layoutController } = useSystemContext();
  const iconSize = config?.branding.fabLabel ? 36 : 56;
  return (
    <div
      style={{
        bottom: 0,
        right: 0,
        zIndex: 1000,
      }}
      className="pos-fixed gpb-16 gpr-16"
    >
      <button
        onClick={layoutController?.toggleOpenClose}
        className={clsx(
          "gooeyChat-launchButton hover-grow cr-pointer bx-shadowA button-hover bg-background",
          config?.branding.fabLabel && "gpl-6 gpt-6 gpb-6 ",
        )}
        style={{ borderRadius: "30px", padding: 0 }}
      >
        {config?.branding.photoUrl && (
          <img
            src={config?.branding.photoUrl}
            alt="Copilot logo"
            style={{
              objectFit: "contain",
              borderRadius: "50%",
              width: iconSize + "px",
              height: iconSize + "px",
            }}
          />
        )}
        {!!config?.branding.fabLabel && (
          <p className="font_16_600 gp-8">{config?.branding.fabLabel}</p>
        )}
      </button>
    </div>
  );
};

export default Launcher;
