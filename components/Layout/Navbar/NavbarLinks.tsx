import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Navbar.module.scss";
import { navLinksVariants } from "../../../utils/AnimationVariants.ts";
import { navMenuVariants } from "../../../utils/AnimationVariants.ts";
import Link from "next/link";

const NavbarLinks: React.FC<{ navMenuShow: boolean }> = (props) => {
  let animateNavLinks: string = "";
  if (!props.navMenuShow) {
    animateNavLinks = "hidden";
  } else {
    animateNavLinks = "show";
  }


  return (
    <Fragment>
      <ul className={styles["nav-links__main"]}>
      <li className={styles["link__container"]}>
          <Link href="/movies">
            <a className={styles["link"]}>MOVIES</a>
          </Link>
        </li>
        <li className={styles["link__container"]}>
          <Link href="/series">
            <a className={styles["link"]}>SERIES</a>
          </Link>
        </li>
        <li className={styles["link__container"]}>
          <Link href="/people">
            <a className={styles["link"]}>PEOPLE</a>
          </Link>
        </li>
      </ul>

      <motion.ul
        variants={navMenuVariants}
        initial="hidden"
        animate={animateNavLinks}
        className={styles["nav-links__collapsable"]}
      >
        <motion.li variants={navLinksVariants} className={styles["link__container"]}>
          <Link href="/movies">
            <a className={styles["link"]}>MOVIES</a>
          </Link>
        </motion.li>
        <motion.li variants={navLinksVariants} className={styles["link__container"]}>
          <Link href="/series">
            <a className={styles["link"]}>SERIES</a>
          </Link>
        </motion.li>
        <motion.li variants={navLinksVariants} className={styles["link__container"]}>
          <Link href="/people">
            <a className={styles["link"]}>PEOPLE</a>
          </Link>
        </motion.li>
      </motion.ul>
    </Fragment>
  );
};

export default NavbarLinks;
