import React, { useEffect, useState, Fragment } from "react";
import styles from "../styles/Navbar.module.scss";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { navVariants } from "../../../utils/AnimationVariants.ts";
import BrandIcon from "../../Icons/BrandIcon";
import NavMenuIcon from "../../Icons/NavMenuIcon";
import useScrollActions from "../../../utils/hooks/useScrollActions";
import NavbarLinks from "./NavbarLinks";

const Navbar: React.FC = () => {
  const router = useRouter();

  const brandClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    router.push("/home");
  };

  const [navMenuShow, setNavMenuShow] = useState(false);
  const menuClickHandler = () => {
    setNavMenuShow((prevState) => !prevState);
  };

  const scrollState = useScrollActions(() => {
    setNavMenuShow(false);
  });
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
        className={styles["nav-container"]}
      >
        <div onClick={brandClickHandler} className={styles["brand"]}>
          <BrandIcon className={styles["brand__icon"]} />
          <p className={styles["brand__text"]}>FILMGET</p>
        </div>
        <NavbarLinks navMenuShow={navMenuShow} />
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
