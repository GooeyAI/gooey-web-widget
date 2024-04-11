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
              className="gpl-8 gpr-8 br-large font_24_500 h-100 hover-grow"
            >
              <IconPaperClip />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleOpenClick}
              className="gpt-12 gpb-11 gpl-16 gpr-16 br-large font_16_600 h-100 hover-grow"
            >
              ❌
            </IconButton>
          )}
          {open && (
            <div className="d-flex align-center">
              <IconButton className="br-large font_16_500 h-100 hover-grow gml-12">
                🎤
              </IconButton>
              <IconButton className="gpt-12 gpb-11 gpl-16 gpr-16 br-large font_16_500 h-100 hover-grow gml-12">
                📹
              </IconButton>
              <IconButton className="gpt-12 gpb-11 gpl-16 gpr-16 br-large font_16_500 h-100 hover-grow gml-12">
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
