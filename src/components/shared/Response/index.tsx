import React from "react";
import { parseResponseBody } from "./responseParser";

// Types
interface GooeyTextResponseProps {
  data: {
    text?: string;
    type?: string;
    status?: string;
    detail?: string;
    output_text?: string[];
    raw_output_text?: string[];
  };
  linkColor?: string;
  showSources?: boolean;
}

const GooeyTextResponse: React.FC<GooeyTextResponseProps> = ({
  data,
  linkColor,
  showSources,
}) => {
  const parsedElements = parseResponseBody(
    data,
    linkColor || "",
    showSources || false,
  );

  return (
    <div className="gooey-response">
      <div className="font_16_400 markdown mw-100">{parsedElements}</div>
    </div>
  );
};

export default GooeyTextResponse;
