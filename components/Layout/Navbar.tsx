import React, { useEffect, useState, Fragment } from "react";
import styles from "./styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/AnimationVariants.ts";
import BrandIcon from "../Icons/BrandIcon";
import NavMenuIcon from "../Icons/NavMenuIcon";

const Navbar: React.FC = () => {
  const router = useRouter();

  // Scroll detection and action based on scroll direction and value
  const { scrollY } = useScroll();
  const [scrollState, setScrollState] = useState("atTop");
  useEffect(() => {
    let prevScroll = 0;
    return scrollY.onChange((latest) => {
      console.log(latest)
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
  let animateNavVariant: string = "";
  switch (scrollState) {
    case "atTop":
      animateNavVariant = "initial";
      break;
    case "scrollingDown":
      animateNavVariant = "hidden";
      break;
    case "scrollingUp":
      animateNavVariant = "show";
  }

  return (
    <Fragment>
      <motion.nav
        initial="initial"
        whileHover="full"
        animate={animateNavVariant}
        variants={navVariants}
        onClick={brandClickHandler}
        className={styles["nav-container"]}
      >
        <div className={styles["brand"]}>
          <BrandIcon className={styles["brand__icon"]} />
          <p className={styles["brand__text"]}>FILMGET</p>
        </div>
        <ul className={styles["nav-links"]}>
          <li className={styles["link"]}>
            <p>MOVIES</p>
          </li>
          <li className={styles["link"]}>
            <p>SERIES</p>
          </li>
          <li className={styles["link"]}>
            <p>PEOPLE</p>
          </li>
        </ul>
        <div className={styles["nav-menu__background"]}>
        <NavMenuIcon className={styles["nav-menu__icon"]}/>
        </div>
      </motion.nav>
    </Fragment>
  );
};

export default Navbar;
