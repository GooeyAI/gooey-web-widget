import type { FC } from "react";
import Launcher from "src/widgets/copilot/components/launcher";

type WithFabLauncherType = {
  children: JSX.Element | FC;
  open: boolean;
};

const WithFabLauncher: FC<WithFabLauncherType> = ({ children, open }) => (
  <div
    tabIndex={-1}
    role="reigon"
    className="pos-relative"
    style={{
      height: "100%",
      width: "100%",
      background: "none",
      overflow: "auto",
      zIndex: 1,
    }}
  >
    {!open && <Launcher />}
    {open && <>{children}</>}
  </div>
);

export default WithFabLauncher;
