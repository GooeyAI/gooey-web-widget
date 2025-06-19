import { useSystemContext } from "src/contexts/hooks";
import { FullSourcePreview } from "src/widgets/copilot/components/Messages/Sources";

const Link = (props: any) => {
  const { layoutController } = useSystemContext();

  const handleClick = () => {
    layoutController?.toggleSecondaryDrawer?.(() => (
      <FullSourcePreview
        data={props?.data}
        layoutController={layoutController}
      />
    ));
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
