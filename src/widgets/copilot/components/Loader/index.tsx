import { useEffect, useRef } from "react";
import CircleBeat from "src/assets/SvgIcons/CircleBeat";
import { BotMessageLayout } from "src/components/ConversationView/BotMessageLayout";

type ResponseLoaderProps = {
  show: boolean;
  scrollMessageContainer?: (offsetTop: number) => void;
  photoUrl?: string;
};

const ResponseLoader = ({ show, scrollMessageContainer, photoUrl}: ResponseLoaderProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (show) {
      const offsetTop = loaderRef?.current?.offsetTop ?? 0;
      if (scrollMessageContainer) scrollMessageContainer(offsetTop);
    }
  }, [show, scrollMessageContainer]);

  if (!show) return null;

  return (
    <div ref={loaderRef} className="gpl-16">
      <BotMessageLayout photoUrl={photoUrl}>
        <CircleBeat className="anim-blink gml-4" size={12} />
      </BotMessageLayout>
    </div>
  );
};

export default ResponseLoader;
