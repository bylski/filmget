import { useState } from "react";
import { useEffect } from "react";
import { useScroll } from "framer-motion";

const useScrollActions = (onScroll?: () => void): string => {
  // Scroll detection and action based on scroll direction and value
  const { scrollY } = useScroll();
  const [scrollState, setScrollState] = useState("atTop");
  useEffect(() => {
    let prevScroll = 0;
    return scrollY.onChange((latest: number) => {
        if (onScroll !== undefined) onScroll();
    //   setNavMenuShow(false);
      if (latest > prevScroll) {
        setScrollState("scrollingDown");
        prevScroll = latest;
      }

      if (latest < prevScroll - 100) {
        setScrollState("scrollingUp");
        prevScroll = latest;
      }

      if (latest === 0) {
        setScrollState("atTop");
      }
    });
  }, []);


  return (scrollState)

};


export default useScrollActions;

