import { useSystemContext } from "src/contexts/hooks";
import { FullSourcePreview } from "src/widgets/copilot/components/Messages/Sources";

const Link = (props: any) => {
  const { layoutController, config } = useSystemContext();

  const handleClick = () => {
    if (
      config?.enableSourcePreview !== undefined &&
      !config?.enableSourcePreview
    ) {
      window.open(props?.data?.url, "_blank");
    } else {
      layoutController?.toggleSecondaryDrawer?.(() => (
        <FullSourcePreview
          data={props?.data}
          layoutController={layoutController}
        />
      ));
    }
  };

  return (
    <a
      onClick={() => handleClick()}
      style={{
        color: props.configColor,
        textDecorationColor: props.configColor,
      }}
      className="gooey-link cr-pointer"
    >
      {props.children}
    </a>
  );
};

export default Link;
