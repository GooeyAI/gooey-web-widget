import type { FC } from "react";
import Launcher from "src/widgets/copilot/components/launcher";

type WithFabLauncherType = {
  children: JSX.Element | FC;
  open: boolean;
};

const WithFabLauncher: FC<WithFabLauncherType> = ({ children, open }) => (
  <div
    role="reigon"
    tabIndex={-1}
    className="pos-relative"
  >
    {!open && <Launcher />}
    {open && <>{children}</>}
  </div>
);

export default WithFabLauncher;
