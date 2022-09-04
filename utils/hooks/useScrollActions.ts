import { useState } from "react";
import { useEffect } from "react";
import { useScroll } from "framer-motion";
import { time } from "console";

interface scrollTypes {
  scrollingDown: boolean;
  scrollingUp: boolean;
  atTop: boolean;
  atBottom: boolean;
}

const useScrollActions = (onScroll?: () => void): scrollTypes => {
  // Scroll detection and action based on scroll direction and value
  const { scrollY } = useScroll();
  // const [scrollState, setScrollState] = useState("atTop");
  const initScrollState: scrollTypes = {
    scrollingDown: false,
    scrollingUp: false,
    atTop: false,
    atBottom: false,
  };
  const [scrollState, setScrollState] = useState<scrollTypes>(initScrollState);

  useEffect(() => {
    // Added some internal state to not re-render the listener based on scrollState.
    // This causes the "prevScroll" to go to 0 again and the previous position is lost.
    let internalState = {
      scrollingDown: false,
      scrollingUp: false,
      atTop: false,
      atBottom: false,
    };
    let prevScroll = 0;

    return scrollY.onChange((latest: number) => {
      const documentHeight = document.body.scrollHeight - 722 || null;
      const { scrollingUp, scrollingDown, atBottom, atTop } = internalState;

      if (onScroll !== undefined) onScroll();

      // console.log(`Saved Scroll: ${Math.floor(prevScroll)}, CurrentScroll: ${Math.floor(latest)}`)

      if (latest > prevScroll + 10) {
        prevScroll = latest;
        if (!scrollingDown) {
          // Set all the states
          internalState.scrollingDown = true;
          internalState.scrollingUp = false;
          setScrollState((prev) => {
            return { ...prev, scrollingDown: true, scrollingUp: false };
          });
        }
      }

      if (latest < prevScroll - 100) {
        prevScroll = latest;
        if (!scrollingUp) {
          internalState.scrollingDown = false;
          internalState.scrollingUp = true;
          setScrollState((prev) => {
            return { ...prev, scrollingUp: true, scrollingDown: false };
          });
        }
      }

      if (latest === 0 && !atTop) {
        internalState.atTop = true;
        setScrollState((prev) => {
          return { ...prev, atTop: true };
        });
      } else if (latest !== 0 && atTop) {
        internalState.atTop = false;
        setScrollState((prev) => {
          return { ...prev, atTop: false };
        });
      }

      if (
        latest > documentHeight! - 50 &&
        documentHeight !== null &&
        !atBottom
      ) {
        internalState.atBottom = true;
        setScrollState((prev) => {
          return { ...prev, atBottom: true };
        });
      } else if (latest < documentHeight! - 100 && atBottom) {
        internalState.atBottom = false;
        setScrollState((prev) => {
          return { ...prev, atBottom: false };
        });
      }
    });
  }, []);

  return scrollState;
};

export default useScrollActions;
