import React, { useEffect, useState, Fragment } from "react";
import styles from "./styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/AnimationVariants.ts";
import BrandIcon from "../Icons/BrandIcon";

const Navbar: React.FC = () => {
  const router = useRouter();

  // Scroll detection and action based on scroll direction and value
  const { scrollY } = useScroll();
  const [scrollState, setScrollState] = useState("atTop");
  useEffect(() => {
    let prevScroll = 0;
    return scrollY.onChange((latest) => {
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

  const brandClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    router.push("/home");
  };

  // Choose which variant to animate
  let animateVariant: string = "";
  switch (scrollState) {
    case "atTop":
      animateVariant = "initial";
      break;
    case "scrollingDown":
      animateVariant = "hidden";
      break;
    case "scrollingUp":
      animateVariant = "show"
  }

  return (
    <Fragment>
      <motion.nav
        initial="initial"
        whileHover="full"
        animate={animateVariant}
        variants={navVariants}
        onClick={brandClickHandler}
        className={styles["nav-container"]}
      >
        <div className={styles["brand"]}>
          <BrandIcon className={styles["brand__icon"]} />
          <p className={styles["brand__text"]}>FILMGET</p>
        </div>
        <div className={styles["nav-links"]}>
          <div className={styles["link"]}>
            <p>MOVIES</p>
          </div>
          <div className={styles["link"]}>
            <p>SERIES</p>
          </div>
          <div className={styles["link"]}>
            <p>ACCOUNT</p>
          </div>
        </div>
      </motion.nav>
    </Fragment>
  );
};

export default Navbar;
