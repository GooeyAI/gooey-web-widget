import IconPencilEdit from "src/assets/SvgIcons/PencilEdit";
import IconButton from "src/components/shared/Buttons/IconButton";
import { useMessagesContext, useSystemContext } from "src/contexts/hooks";
import IconClose from "src/assets/SvgIcons/IconClose";
import clsx from "clsx";
import { SystemContextType } from "src/contexts/SystemContext";

import IconExpand from "src/assets/SvgIcons/IconExpand";
import IconCollapse from "src/assets/SvgIcons/IconCollapse";
import useDeviceWidth from "src/hooks/useDeviceWidth";
import { MOBILE_WIDTH } from "src/utils/constants";

type HeaderProps = {
  onEditClick: () => void;
  hideClose?: boolean;
};

const Header = ({ onEditClick }: HeaderProps) => {
  const width = useDeviceWidth();
  const { messages }: any = useMessagesContext();
  const { layoutController, config }: SystemContextType = useSystemContext();
  
  const isEmpty = !messages?.size;
  const botName = config?.branding?.name;
  const isMobile = width < MOBILE_WIDTH;
  return (
    <div className="bg-white b-btm-1 b-top-1 gp-8 d-flex justify-between align-center pos-sticky w-100">
      <div className="d-flex">
        {/* Close / minimize button */}
        {layoutController?.showCloseButton && (
          <IconButton
            variant="text"
            className="gp-4 cr-pointer flex-1"
            onClick={layoutController?.toggleOpenClose}
          >
            <IconClose size={24} />
          </IconButton>
        )}
        {/* Expand button */}
        {layoutController?.showFocusModeButton && !isMobile && (
          <IconButton
            variant="text"
            className="cr-pointer flex-1 gmr-8"
            onClick={layoutController?.toggleFocusMode}
            style={{ transform: "rotate(90deg)" }}
          >
            {layoutController.isFocusMode ? (
              <IconCollapse size={16} />
            ) : (
              <IconExpand size={16} />
            )}
          </IconButton>
        )}
      </div>
      <p
        className="font_16_700"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {botName}
      </p>
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
