import { useEffect, useRef } from "react";

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
    <div ref={LoaderRef} className="p-16 b-1 br-large anim-typing">
      <p>Loading response... </p>
    </div>
  );
};

export default ResponseLoader;
