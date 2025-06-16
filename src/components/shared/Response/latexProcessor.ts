// LaTeX Processing Module
// Handles detection, replacement, and restoration of LaTeX expressions

export interface LaTeXExpression {
  content: string;
  displayMode: boolean;
}

export interface LaTeXProcessingResult {
  processedText: string;
  expressions: Map<string, LaTeXExpression>;
}

// Constants
const LATEX_PLACEHOLDER_PREFIX = '[[[LATEX';
const LATEX_PLACEHOLDER_SUFFIX = ']]]';
const LATEX_TYPES = {
  DISPLAY: 'DISPLAY',
  INLINE: 'INLINE',
} as const;

// Regex patterns for LaTeX detection
const DISPLAY_MATH_PATTERN = /(?<!\\)\\\[(.*?)\\\]/gs;
const INLINE_MATH_PATTERN = /(?<!\\)\\\((.+?)\\\)/g;


// Patterns to avoid false positives
const NON_MATH_PATTERNS = [
  /^[A-Za-z\s]+$/, // Only letters and spaces
  /http/, // URLs
  /www/, // URLs
];

class LaTeXProcessor {
  private mathIndex = 0;

  public processText(text: string): LaTeXProcessingResult {
    const expressions = new Map<string, LaTeXExpression>();
    let processedText = text;

    // Reset counter for each processing
    this.mathIndex = 0;

    // Process display math first, then inline math
    processedText = this.processDisplayMath(processedText, expressions);
    processedText = this.processInlineMath(processedText, expressions);

    return { processedText, expressions };
  }

  private processDisplayMath(
    text: string, 
    expressions: Map<string, LaTeXExpression>
  ): string {
    return text.replace(DISPLAY_MATH_PATTERN, (match, content) => {
      if (!this.isValidMathContent(content)) {
        return match;
      }

      const placeholder = this.createPlaceholder(LATEX_TYPES.DISPLAY);
      expressions.set(placeholder, {
        content: content.trim(),
        displayMode: true
      });

      return placeholder;
    });
  }

  private processInlineMath(
    text: string, 
    expressions: Map<string, LaTeXExpression>
  ): string {
    return text.replace(INLINE_MATH_PATTERN, (match, content) => {
      if (!this.isValidMathContent(content) || this.isLikelyNotMath(content)) {
        return match;
      }

      const placeholder = this.createPlaceholder(LATEX_TYPES.INLINE);
      expressions.set(placeholder, {
        content: content.trim(),
        displayMode: false
      });

      return placeholder;
    });
  }

  private isValidMathContent(content: string): boolean {
    return content !== undefined && content !== null && content.trim().length > 0;
  }

  private isLikelyNotMath(content: string): boolean {
    return NON_MATH_PATTERNS.some((pattern) => pattern.test(content));
  }

  private createPlaceholder(type: string): string {
    return `${LATEX_PLACEHOLDER_PREFIX}${type}${this.mathIndex++}${LATEX_PLACEHOLDER_SUFFIX}`;
  }

  public isLatexPlaceholder(text: string): boolean {
    return text.includes(LATEX_PLACEHOLDER_PREFIX) && text.includes(LATEX_PLACEHOLDER_SUFFIX);
  }

  public extractPlaceholderFromText(
    text: string, 
    expressions: Map<string, LaTeXExpression>
  ): { placeholder: string; expression: LaTeXExpression } | null {
    for (const [placeholder, expression] of expressions) {
      if (text.includes(placeholder)) {
        return { placeholder, expression };
      }
    }
    return null;
  }
}

export const latexProcessor = new LaTeXProcessor(); 