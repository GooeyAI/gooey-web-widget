import { useEffect, useRef } from "react";
import { BotMessageLayout } from "../Messages/IncomingMsg";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";

const ResponseLoader = (props: any) => {
  const LoaderRef = useRef(null);
  useEffect(() => {
    if (props.show) {
      const loader: any = LoaderRef.current;
      loader.scrollIntoView(false, {
        behavior: "smooth",
      });
    }
  }, [props.show]);
  if (!props.show) return null;
  return (
    <div ref={LoaderRef}>
      <BotMessageLayout />
      <CircleBeat className="anim-blink gml-36 gmt-4" size={16} />
    </div>
  );
};

export default ResponseLoader;
