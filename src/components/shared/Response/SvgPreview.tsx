import { useEffect, useMemo } from "react";
import IconButton from "src/components/shared/Buttons/IconButton";
import IconCheck from "src/assets/SvgIcons/IconCheck";
import IconCopy from "src/assets/SvgIcons/IconCopy";
import IconDownload from "src/assets/SvgIcons/IconDownload";
import GooeyTooltip from "src/components/shared/Tooltip";
import { useCopyFeedback } from "src/components/shared/useCopyFeedback";
import { prepareSvgForPreview } from "./svgMarkup";

const SvgPreview = ({ markup }: { markup: string }) => {
  const previewMarkup = useMemo(() => prepareSvgForPreview(markup), [markup]);
  const objectUrl = useMemo(() => {
    const blob = new Blob([previewMarkup], {
      type: "image/svg+xml;charset=utf-8",
    });
    return URL.createObjectURL(blob);
  }, [previewMarkup]);
  const { copied, signalCopied } = useCopyFeedback();

  useEffect(() => () => URL.revokeObjectURL(objectUrl), [objectUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markup);
      signalCopied();
    } catch (err) {
      console.error("Failed to copy SVG:", err);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "image.svg";
    link.click();
  };

  return (
    <span className="gooey-svg-preview d-block gmt-8 gmb-12 br-default overflow-hidden">
      <span className="d-flex align-center justify-between gp-4 gpl-12 gpr-4">
        <span className="font_12_600 text-muted">SVG</span>
        <span className="d-flex align-center">
          <GooeyTooltip text="Download">
            <IconButton
              type="button"
              className="text-muted d-flex justify-content-center align-items-center"
              onClick={handleDownload}
              aria-label="Download SVG"
            >
              <IconDownload size={16} />
            </IconButton>
          </GooeyTooltip>
          <GooeyTooltip
            text={copied ? "Copied" : "Copy code"}
            forceShow={copied}
          >
            <IconButton
              type="button"
              className="text-muted d-flex justify-content-center align-items-center"
              onClick={handleCopy}
              aria-label="Copy SVG code"
            >
              {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            </IconButton>
          </GooeyTooltip>
        </span>
      </span>
      <span className="gooey-svg-preview-canvas d-flex align-center justify-center gp-16">
        <img
          src={objectUrl}
          alt="Generated SVG"
          className="gooey-svg-preview-image"
        />
      </span>
    </span>
  );
};

export default SvgPreview;
