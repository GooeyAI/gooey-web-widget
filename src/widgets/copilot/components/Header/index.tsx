import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import "./header.scss";
import IconButton from "src/components/shared/Buttons/IconButton";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import IconClose from "src/assets/SvgIcons/IconClose";
import clsx from "clsx";

type HeaderProps = {
  onEditClick: () => void;
};

const Header = ({ onEditClick }: HeaderProps) => {
  const { toggleWidget }: any = useSystemContext();
  const { messages, cancelApiCall }:any = useMessagesContext()
  const isEmpty = !messages?.size;
  return (
    <div className="p-8 bg-white gooeyChat-widget-headerContainer d-flex justify-between align-center">
      <div>
        {/* Logo */}
        <IconButton
          variant="text"
          className="p-4 cr-pointer flex-1"
          onClick={() => toggleWidget()}
        >
          <IconClose size={20} />
        </IconButton>
      </div>
      <p className="font_16_700">Farmer.CHAT</p>
      <div>
        <IconButton
          disabled={isEmpty}
          variant="text"
          className={clsx("p-4 cr-pointer flex-1", )}
          onClick={() => messages.size === 1 ? cancelApiCall() : onEditClick()}
        >
          <IconPencilEdit size={20} />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
