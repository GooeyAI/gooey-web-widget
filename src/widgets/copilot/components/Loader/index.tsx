import { useEffect, useRef } from "react";
import { BotMessageLayout } from "../Messages/IncomingMsg";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";
import { useMessagesContext } from "src/contexts/hooks";

const ResponseLoader = (props: any) => {
  const { scrollMessageContainer } : any = useMessagesContext();
  const LoaderRef = useRef<null | HTMLElement>(null)
  useEffect(() => {
    if (props.show) {
      const offsetTop = LoaderRef?.current?.offsetTop;
      scrollMessageContainer(offsetTop);
    }
  }, [props.show, scrollMessageContainer]);
  if (!props.show) return null;
  return (
    <div ref={LoaderRef}>
      <BotMessageLayout />
      <CircleBeat className="anim-blink gml-36 gmt-4" size={16} />
    </div>
  );
};

export default ResponseLoader;
