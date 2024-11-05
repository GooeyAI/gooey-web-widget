import { useSystemContext } from "src/contexts/hooks";
import clsx from "clsx";
import { useEffect } from "react";

const SecondaryDrawer = () => {
  const { layoutController } = useSystemContext();
  const isMobile = layoutController?.isMobile;
  useEffect(() => {
    const sideBarElement: HTMLElement | null | undefined =
      gooeyShadowRoot?.querySelector("#gooey-right-bar");

    // mobile view should always be full width
    if (!sideBarElement || !layoutController?.isSecondaryDrawerOpen) return;
    if (layoutController?.isMobile) {
      sideBarElement.style.width = "100%";
      sideBarElement.style.position = "absolute !important";
    } else {
      if (layoutController?.isSecondaryDrawerOpen) {
        sideBarElement.style.width = "65vw";
        sideBarElement.style.position = "relative !important";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  return (
    <div
      id="gooey-right-bar"
      style={{
        zIndex: 10,
      }}
      className={clsx(
        "b-lt-1 h-100 overflow-x-hidden top-0 right-0 bg-grey d-flex flex-col",
        layoutController?.isMobile ? "pos-absolute" : "pos-relative",
      )}
    >
      {layoutController?.secondaryDrawerContent?.()}
    </div>
  );
};

export default SecondaryDrawer;
