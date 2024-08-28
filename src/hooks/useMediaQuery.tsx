import { useEffect, useState } from "react";

const deviceWidths: Record<string, number> = {
  mobile: 640,
};
const checkMediaQuery = (width: number, query: string) => {
  return width <= deviceWidths[query];
};

const useMediaQuery = (
  query: "mobile" = "mobile",
  deps: any[] = []
): boolean => {
  const [matches, setMatches] = useState<boolean>(false);
  const depTrigger = deps?.some((dep) => !dep);

  useEffect(() => {
    const rootDiv = gooeyShadowRoot?.querySelector("#gooeyChat-container");
    if (!rootDiv) return;

    // set initial value
    checkMediaQuery(rootDiv.clientWidth, query);
    console.log(rootDiv.clientWidth, ">>");

    const resizeObserver = new ResizeObserver(() => {
      setMatches(() => {
        const isMediaQueryMatched = checkMediaQuery(rootDiv.clientWidth, query);

        if (isMediaQueryMatched) return true;
        return false;
      });
    });
    resizeObserver.observe(rootDiv);

    return () => {
      resizeObserver.disconnect();
    };
  }, [query, depTrigger]);

  return matches;
};

export default useMediaQuery;
