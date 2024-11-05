import { useSystemContext } from "src/contexts/hooks";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const MIN_DRAWER_WIDTH = 300;
const MAX_DRAWER_WIDTH = 800;
const RESIZE_HANDLE_WIDTH = 4;

const SecondaryDrawer = () => {
  const { layoutController } = useSystemContext();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(window.innerWidth * 0.65);

  useEffect(() => {
    const sideBarElement = drawerRef.current;

    if (!sideBarElement || !layoutController?.isSecondaryDrawerOpen) return;

    if (layoutController?.isMobile) {
      sideBarElement.style.width = "100%";
      sideBarElement.style.position = "absolute !important";
    } else {
      if (layoutController?.isSecondaryDrawerOpen) {
        sideBarElement.style.width = `${drawerWidth}px`;
        sideBarElement.style.position = "relative !important";
      }
    }
  }, [
    layoutController?.isMobile,
    layoutController?.isSecondaryDrawerOpen,
    drawerWidth,
  ]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (layoutController?.isMobile) return;
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
        Math.max(MAX_DRAWER_WIDTH, containerRect.width * 0.8),
      );

      setDrawerWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

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
        position: layoutController?.isMobile ? "absolute" : "relative",
      }}
      className={clsx(
        "h-100 overflow-x-hidden top-0 right-0 bg-grey d-flex flex-col pos-relative",
      )}
    >
      {/* Content Container */}
      <div className="h-100 w-100 overflow-auto">
        {layoutController?.secondaryDrawerContent?.()}
      </div>

      {/* Resize System */}
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
            width: "2px",
            height: "100%",
          }}
          className="bg-light drawer-resize-bar"
        />
      </div>

      {/* Full-screen overlay during resize */}
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