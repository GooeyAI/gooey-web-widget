import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import "./header.scss";
import IconButton from "src/components/shared/Buttons/IconButton";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import IconClose from "src/assets/SvgIcons/IconClose";
import clsx from "clsx";
import { SystemContextType } from "src/contexts/SystemContext";

type HeaderProps = {
  onEditClick: () => void;
  hideClose?: boolean;
};

const Header = ({ onEditClick, hideClose = false }: HeaderProps) => {
  const { toggleWidget, config }: SystemContextType = useSystemContext();
  const { messages }: any = useMessagesContext();
  const isEmpty = !messages?.size;
  const botName = config?.bot_profile?.title;
  return (
    <div className="gp-8 bg-white gooeyChat-widget-headerContainer d-flex justify-between align-center">
      <div>
        {/* Logo */}
        {!hideClose && (
          <IconButton
            variant="text"
            className="gp-4 cr-pointer flex-1"
            onClick={() => toggleWidget()}
          >
            <IconClose size={24} />
          </IconButton>
        )}
      </div>
      <p className="font_16_700">{botName}</p>
      <div>
        <IconButton
          disabled={isEmpty}
          variant="text"
          className={clsx("gp-4 cr-pointer flex-1")}
          onClick={() => onEditClick()}
        >
          <IconPencilEdit size={24} />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
