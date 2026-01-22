import { createPortal } from "react-dom";
import { ReactNode, useContext, useEffect, useMemo } from "react";
import clsx from "clsx";

import { addInlineStyle } from "src/addStyles";
import dialogStyle from "./dialog.scss?inline";
import IconClose from "src/assets/SvgIcons/IconClose";
import { ShadowRootContext } from "src/contexts/ShadowRootContext";

addInlineStyle(dialogStyle);

type DialogWidth = "xs" | "sm" | "md" | "lg" | "xl";

type GooeyDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: DialogWidth;
  fullWidth?: boolean;
  fullScreen?: boolean;
  disableBackdropClick?: boolean;
  className?: string;
  bodyClassName?: string;
};

const GooeyDialog = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  fullScreen = false,
  disableBackdropClick = false,
  className = "",
  bodyClassName = "",
}: GooeyDialogProps) => {
  const shadowRoot = useContext(ShadowRootContext);
  const container =
    shadowRoot?.querySelector(".gooey-embed-container") || document.body;

  const titleId = useMemo(
    () => (title ? `gooey-dialog-title-${Math.random().toString(36).slice(2)}` : undefined),
    [title],
  );
  const subtitleId = useMemo(
    () =>
      subtitle ? `gooey-dialog-subtitle-${Math.random().toString(36).slice(2)}` : undefined,
    [subtitle],
  );

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const dialogContent = (
    <div
      className="gooey-dialog-backdrop d-flex align-center justify-center gp-16"
      role="presentation"
      onClick={!disableBackdropClick ? onClose : undefined}
    >
      <div
        className={clsx(
          "gooey-dialog-paper d-flex flex-col w-100",
          `max-${maxWidth}`,
          fullWidth && "full-width",
          fullScreen && "full-screen",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitleId}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || subtitle) && (
          <div className="gooey-dialog-header d-flex justify-between align-start gpt-20 gpb-12 gpl-24 gpr-24 gap-12">
            <div className="gooey-dialog-header-text flex-1">
              {title && (
                <div
                  id={titleId}
                  className="gooey-dialog-title font_20_700 text-primary"
                >
                  {title}
                </div>
              )}
              {subtitle && (
                <div
                  id={subtitleId}
                  className="gooey-dialog-subtitle font_14_500 text-muted gmt-4"
                >
                  {subtitle}
                </div>
              )}
            </div>
            <button
              type="button"
              className="gooey-dialog-close d-flex align-center justify-center br-default cr-pointer"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <IconClose size={18} />
            </button>
          </div>
        )}

        <div
          className={clsx(
            "gooey-dialog-body gpl-24 gpr-24 gpb-20 overflow-y-auto flex-1",
            bodyClassName,
          )}
        >
          {children}
        </div>

        {actions && (
          <div className="gooey-dialog-actions d-flex justify-end align-center gap-12 gpt-16 gpb-20 gpl-24 gpr-24">
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(dialogContent, container);
};

export default GooeyDialog;