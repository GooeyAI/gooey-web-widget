import React from "react";
import katex from "katex";
import { addInlineStyle } from "src/addStyles";

import katexCss from "katex/dist/katex.min.css?inline";
addInlineStyle(katexCss);

interface LaTeXProps {
  children: string;
  displayMode?: boolean;
  className?: string;
}

const LaTeX: React.FC<LaTeXProps> = ({
  children,
  displayMode = false,
  className = "",
}) => {
  try {
    const html = katex.renderToString(children, {
      displayMode,
      throwOnError: false,
      strict: false,
    });

    return (
      <span
        className={`latex-math ${displayMode ? "latex-display" : "latex-inline"} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    console.warn("LaTeX render error:", error);
    return (
      <span className={`latex-error ${className}`}>
        {displayMode ? `[${children}]` : `(${children})`}
      </span>
    );
  }
};

export default LaTeX;
