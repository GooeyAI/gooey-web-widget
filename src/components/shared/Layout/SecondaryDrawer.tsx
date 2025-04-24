import { useSystemContext } from "src/contexts/hooks";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const MIN_DRAWER_WIDTH = 300;
const MAX_DRAWER_WIDTH = 800;
const RESIZE_HANDLE_WIDTH = 5;

type SecondaryDrawerProps = {
  isMobile?: boolean;
  isOpen?: boolean;
  contentRenderer?: () => React.ReactNode;
};

const SecondaryDrawer = ({
  isMobile,
  isOpen,
  contentRenderer,
}: SecondaryDrawerProps) => {
  console.log({
    isMobile,
    isOpen,
    contentRenderer,      
  }, "SecondaryDrawer props");

  const { layoutController } = useSystemContext();

  // Fallbacks to context values
  const effectiveIsMobile = isMobile ?? layoutController?.isMobile;
  const effectiveIsOpen = isOpen ?? layoutController?.isSecondaryDrawerOpen;
  const renderContent = contentRenderer ?? layoutController?.secondaryDrawerContent;

  const drawerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(window.innerWidth * 0.65);

  useEffect(() => {
    const sideBarElement = drawerRef.current;
    if (!sideBarElement || !effectiveIsOpen) return;

    if (effectiveIsMobile) {
      sideBarElement.style.width = "100%";
      sideBarElement.style.position = "absolute !important";
    } else {
      sideBarElement.style.width = `${drawerWidth}px`;
      sideBarElement.style.position = "relative !important";
    }
  }, [effectiveIsMobile, effectiveIsOpen, drawerWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (effectiveIsMobile) return;
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const container = drawerRef.current?.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newWidth = containerRect.right - e.clientX;

      const constrainedWidth = Math.min(
        Math.max(newWidth, MIN_DRAWER_WIDTH),
        Math.max(MAX_DRAWER_WIDTH, containerRect.width * 0.8)
      );

      setDrawerWidth(constrainedWidth);
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "ew-resize";
    } else {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);

  return (
    <div
      ref={drawerRef}
      id="gooey-right-bar"
      style={{
        zIndex: 10,
        transition: isResizing ? "none" : "width 0.2s ease",
        position: effectiveIsMobile ? "absolute" : "relative",
      }}
      className={clsx(
        "h-100 top-0 overflow-x-hidden right-0 bg-grey d-flex flex-col"
      )}
    >
      {/* Content */}
      <div className="h-100 w-100 flex-1 d-flex flex-col">
        {renderContent?.()}
      </div>

      {/* Resize Handle */}
      {!effectiveIsMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -RESIZE_HANDLE_WIDTH / 2,
            width: `${RESIZE_HANDLE_WIDTH}px`,
            height: "100%",
            cursor: "ew-resize",
            zIndex: 20,
          }}
          className={clsx(isResizing && "bg-light")}
          onMouseDown={handleMouseDown}
        >
          <div
            style={{
              position: "absolute",
              left: RESIZE_HANDLE_WIDTH / 2,
              width: "5px",
              height: "100%",
            }}
            className="bg-white b-lt-1 b-rt-1 drawer-resize-bar"
          />
        </div>
      )}

      {/* Overlay */}
      {isResizing && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 19,
            cursor: "ew-resize",
          }}
        />
      )}
    </div>
  );
};

export default SecondaryDrawer;
