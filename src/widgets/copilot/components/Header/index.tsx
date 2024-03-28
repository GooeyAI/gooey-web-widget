import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import "./header.scss";
import IconButton from "src/components/shared/Buttons/IconButton";
import { useSystemContext } from "src/contexts/hooks";
import IconClose from "src/assets/SvgIcons/IconClose";
import clsx from "clsx";

type HeaderProps = {
  onViewChange: (val: string) => void;
};
const Header = ({ onViewChange }: HeaderProps) => {
  const { toggleWidget }: any = useSystemContext();

  return (
    <div className="p-8 bg-white gooeyChat-widget-headerContainer d-flex justify-between align-center">
      <div>
        {/* Logo */}
        <IconButton
          className="p-4 cr-pointer flex-1"
          onClick={() => toggleWidget()}
        >
          <IconClose size={20} />
        </IconButton>
      </div>
      <p className="font_16_700">Farmer.CHAT</p>
      <div>
        <IconButton
          className={clsx("p-4 cr-pointer flex-1", )}
          onClick={() => onViewChange("home")}
        >
          <IconPencilEdit size={20} />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
