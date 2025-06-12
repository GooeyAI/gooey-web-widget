import { useEffect, useRef } from "react";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";
import { useMessagesContext } from "src/contexts/hooks";

const ResponseLoader = (props: any) => {
  const { scrollMessageContainer } = useMessagesContext();
  const LoaderRef = useRef(null);
  useEffect(() => {
    if (props.show) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const offsetTop = LoaderRef?.current?.offsetTop;
      scrollMessageContainer?.(offsetTop);
    }
  }, [props.show, scrollMessageContainer]);
  if (!props.show) return null;
  return (
    <div ref={LoaderRef} className="gpl-16">
      <CircleBeat className="anim-blink gml-4" size={12} />
    </div>
  );
};

export default ResponseLoader;
