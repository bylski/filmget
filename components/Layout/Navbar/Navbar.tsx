import React, { useEffect, useState, Fragment } from "react";
import styles from "../styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { animate, motion } from "framer-motion";
import { navVariants } from "../../../utils/AnimationVariants.ts";
import BrandIcon from "../../Icons/BrandIcon";
import NavMenuIcon from "../../Icons/NavMenuIcon";
import useScrollActions from "../../../utils/hooks/useScrollActions";
import NavbarLinks from "./NavbarLinks";

const Navbar: React.FC = () => {
  // If window is being resized - hide nav menu
  useEffect(() => {
    window.addEventListener("resize", () => {
      setNavMenuShow(false);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setNavMenuShow(false);
      });
  }, []);

  // Take user home when nav brand clicked
  const router = useRouter();
  const brandClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    router.push("/home");
  };

  const [navMenuShow, setNavMenuShow] = useState(false);
  const menuClickHandler = () => {
    setNavMenuShow((prevState) => !prevState);
  };

  // Get scrolling state
  const scrollState = useScrollActions(() => {
    setNavMenuShow(false);
  });

  // Choose which variant to animate
  let animateNavVariant: string = "";

  if (scrollState.atTop) {
    animateNavVariant = "initial";
  } else if (scrollState.scrollingUp) {
    animateNavVariant = "show";
  } else if (scrollState.scrollingDown) {
    animateNavVariant = "hidden";
  }

  return (
    <Fragment>
      <motion.nav
        initial="initial"
        whileHover="full"
        animate={animateNavVariant}
        variants={navVariants}
        className={styles["nav-container"]}
      >
        <div onClick={brandClickHandler} className={styles["brand"]}>
          <BrandIcon className={styles["brand__icon"]} />
          <p className={styles["brand__text"]}>FILMGET</p>
        </div>
        <NavbarLinks linkOnClick={menuClickHandler} navMenuShow={navMenuShow} />
        <div
          onClick={menuClickHandler}
          className={styles["nav-menu__background"]}
        >
          <NavMenuIcon className={styles["nav-menu__icon"]} />
        </div>
      </motion.nav>
    </Fragment>
  );
};

export default Navbar;
