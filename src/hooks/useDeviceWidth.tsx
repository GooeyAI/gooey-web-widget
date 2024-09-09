import { useEffect, useState } from "react";

const deviceWidths: Record<string, number> = {
  mobile: 640,
};
const checkMediaQuery = (width: number, windowWidth: number, query: string) => {
  return [width <= deviceWidths[query], windowWidth <= deviceWidths[query]];
};

const useDeviceWidth = (
  query: "mobile" = "mobile",
  deps: any[] = []
): boolean[] => {
  const [isWidgetMatches, setIsWidgetMatches] = useState(false);
  const [isWindowMatches, setIsWindowMatches] = useState(false);
  const depTrigger = deps?.some((dep) => !dep);

  useEffect(() => {
    const rootDiv = gooeyShadowRoot?.querySelector("#gooeyChat-container");
    if (!rootDiv) return;

    // set initial value
    const [widgetMatches, windowMatches] = checkMediaQuery(
      rootDiv.clientWidth,
      window.innerWidth,
      query
    );
    setIsWidgetMatches(widgetMatches);
    setIsWindowMatches(windowMatches);

    const resizeObserver = new ResizeObserver(() => {
      // set initial value
      const [widgetMatches, windowMatches] = checkMediaQuery(
        rootDiv.clientWidth,
        window.innerWidth,
        query
      );
      setIsWidgetMatches(widgetMatches);
      setIsWindowMatches(windowMatches);
    });
    resizeObserver.observe(rootDiv);

    return () => {
      resizeObserver.disconnect();
    };
  }, [query, depTrigger]);

  return [isWidgetMatches, isWindowMatches];
};

export default useDeviceWidth;
