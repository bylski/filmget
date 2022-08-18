import { useEffect, useState } from "react";

const useBreakpoints = (
  ...givenBreakpoints: Array<{ breakpointName: string; breakpointVal: number }>
) => {
  const detectBreakpoints = (
    ...breakpoints: Array<{ breakpointName: string; breakpointVal: number }>
  ): { [key: string]: boolean }[] => {
    // If no breakpoints provided - return with zero elements
    if (breakpoints.length === 0) {
      return [];
    }

    // Create array of media queries, using the breakpointsNames from function's parameters
    let allQueries: Array<{ [key: string]: MediaQueryList }> = [];
    for (let breakpoint of breakpoints) {
      allQueries.push({
        [breakpoint.breakpointName]: window.matchMedia(
          `(max-width: ${breakpoint.breakpointVal}px)`
        ),
      });
    }

    // if query matches -> add it to object containing matching queries
    let matchingQueries: { [key: string]: boolean }[] = [];
    for (let query of allQueries) {
      for (let key in query) {
        if (query[key].matches) {
          matchingQueries.push({ [key]: true }); // add it to array as "keyName: boolean"
        } else {
          matchingQueries.push({ [key]: false });
        }
      }
    }

    return matchingQueries;
  };

  const [matchingBreakpoints, setMatchingBreakpoints] =
    useState<{ [key: string]: boolean }[]>();
  useEffect(() => {
    // Check breakpoints at component load
    setMatchingBreakpoints(detectBreakpoints(...givenBreakpoints));

    // Check breapoitns on every resize
    window.addEventListener("resize", () => {
      setMatchingBreakpoints(detectBreakpoints(...givenBreakpoints));
    });

    // Remove unnecessary listeners
    return window.removeEventListener("resize", () => {
      setMatchingBreakpoints(detectBreakpoints(...givenBreakpoints));
    });
  }, []);

  return matchingBreakpoints;
};

export default useBreakpoints;
