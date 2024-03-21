import IconPaperClip from "src/assets/SvgIcons/IconPaperClip";
import IconButton from "src/components/shared/Buttons/IconButton";
import Tooltip from "src/components/shared/Tooltip";

interface AttachFilesButtonProps {
  onAttachClick?: () => null;
  open: boolean;
}

const AttachFilesButton = ({
  onAttachClick = () => null,
  open = false,
}: AttachFilesButtonProps) => {
  const handleOpenClick = () => {
    onAttachClick();
  };

  return (
    <div>
      <Tooltip open={true}>
        <div className="d-flex align-center">
          {!open ? (
            <IconButton
              onClick={handleOpenClick}
              className="pl-8 pr-8 br-large font_24_500 h-100 hover-grow"
            >
              <IconPaperClip />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleOpenClick}
              className="pt-12 pb-11 pl-16 pr-16 br-large font_16_600 h-100 hover-grow"
            >
              ❌
            </IconButton>
          )}
          {open && (
            <div className="d-flex align-center">
              <IconButton className="br-large font_16_500 h-100 hover-grow ml-12">
                🎤
              </IconButton>
              <IconButton className="pt-12 pb-11 pl-16 pr-16 br-large font_16_500 h-100 hover-grow ml-12">
                📹
              </IconButton>
              <IconButton className="pt-12 pb-11 pl-16 pr-16 br-large font_16_500 h-100 hover-grow ml-12">
                📄
              </IconButton>
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default AttachFilesButton;
