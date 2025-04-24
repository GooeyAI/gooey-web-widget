import { useEffect, useState } from "react";

const deviceWidths: Record<string, number> = {
  mobile: 768,
};
const checkMediaQuery = (width: number, windowWidth: number, query: string) => {
  return [width <= deviceWidths[query], windowWidth <= deviceWidths[query]];
};

const useDeviceWidth = (
  query: "mobile" = "mobile",
  deps: any[] = [],
  domContext: ShadowRoot | null = null
): boolean[] => {
  const [isWidgetMatches, setIsWidgetMatches] = useState(false);
  const [isWindowMatches, setIsWindowMatches] = useState(false);
  const depTrigger = deps?.some((dep) => !dep);

  console.log(depTrigger, ">>depTrigger");
  useEffect(() => {
    const container = domContext?.querySelector("#gooeyChat-container");
    if (!container) return;

    // set initial value
    const [widgetMatches, windowMatches] = checkMediaQuery(
      container.clientWidth,
      window.innerWidth,
      query
    );
    setIsWidgetMatches(widgetMatches);
    setIsWindowMatches(windowMatches);

    const resizeObserver = new ResizeObserver(() => {
      // set initial value
      const [widgetMatches, windowMatches] = checkMediaQuery(
        container.clientWidth,
        window.innerWidth,
        query
      );
      setIsWidgetMatches(widgetMatches);
      setIsWindowMatches(windowMatches);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [query, depTrigger]);

  return [isWidgetMatches, isWindowMatches];
};

export default useDeviceWidth;
