import { useEffect, useRef } from "react";
import { BotMessageLayout } from "../Messages/IncomingMsg";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";
import { useMessagesContext } from "src/contexts/hooks";

const ResponseLoader = (props: any) => {
  const { scrollMessageContainer }: any = useMessagesContext();
  const LoaderRef = useRef(null);
  useEffect(() => {
    if (props.show) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const offsetTop = LoaderRef?.current?.offsetTop;
      scrollMessageContainer(offsetTop);
    }
  }, [props.show, scrollMessageContainer]);
  if (!props.show) return null;
  return (
    <div ref={LoaderRef} className="gpl-16">
      <BotMessageLayout />
      <CircleBeat className="anim-blink gml-36 gmt-4" size={16} />
    </div>
  );
};

export default ResponseLoader;
