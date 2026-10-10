import { useEffect, useRef } from "react";
import { ThinkingLine } from "src/components/shared/ThinkingLine";
import { useMessagesContext } from "src/contexts/hooks";
import { MESSAGE_GUTTER } from "../Messages";

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
    <div ref={LoaderRef} className={`gpl-${MESSAGE_GUTTER + 4}`}>
      <ThinkingLine />
    </div>
  );
};

export default ResponseLoader;
