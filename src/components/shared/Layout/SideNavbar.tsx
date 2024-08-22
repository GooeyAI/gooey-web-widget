import { useSystemContext } from "src/contexts/hooks";
import IconButton from "../Buttons/IconButton";
import IconSidebar from "src/assets/SvgIcons/IconSideBar";
import Button from "../Buttons/Button";
import clsx from "clsx";
import useDeviceWidth from "src/hooks/useDeviceWidth";
import { MOBILE_WIDTH } from "src/utils/constants";

const SideNavbar = () => {
  const { layoutController, config } = useSystemContext();
  const width = useDeviceWidth();
  const isMobile = width < MOBILE_WIDTH;
  const isOpen = layoutController?.isSidebarOpen;
  const branding = config?.branding;

  return (
    <nav
      style={{
        overflowX: "hidden",
        width: isOpen ? "260px" : "0px",
        transition: "width ease-in-out 0.2s",
        top: 0,
        left: 0,
        height: "100%",
        zIndex: 10,
      }}
      className={clsx(
        "b-1 bg-white h-100 overflow-x-hidden",
        isMobile ? "pos-absolute" : "pos-relative"
      )}
    >
      {/* Header */}
      <div className="gp-8 d-flex b-btm-1 flex-col pos-sticky">
        <IconButton
          variant="text"
          className="gp-6 cr-pointer"
          onClick={layoutController?.toggleSidebar}
        >
          <IconSidebar size={20} />
        </IconButton>
      </div>

      <div className="d-flex flex-col gp-8">
        <Button className="w-100 d-flex">
          <div
            className="bot-avatar bg-primary gmr-12"
            style={{ width: "24px", height: "24px", borderRadius: "100%" }}
          >
            <img
              src={branding?.photoUrl}
              alt="bot-avatar"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <p className="font_16_600">{branding?.name}</p>
        </Button>
      </div>
    </nav>
  );
};

export default SideNavbar;
