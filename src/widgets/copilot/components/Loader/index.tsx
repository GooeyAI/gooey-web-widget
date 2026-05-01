import CircleBeat from "src/assets/SvgIcons/CircleBeat";

const ResponseLoader = (props: any) => {
  if (!props.show) return null;
  return (
    <div className="gpl-16">
      <CircleBeat className="anim-blink gml-4" size={12} />
    </div>
  );
};

export default ResponseLoader;
