import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Navbar.module.scss";
import { navLinksVariants } from "../../../utils/AnimationVariants.ts";
import { navMenuVariants } from "../../../utils/AnimationVariants.ts";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarLinks: React.FC<{ navMenuShow: boolean }> = (props) => {
  let animateNavLinks: string = "";
  if (!props.navMenuShow) {
    animateNavLinks = "hidden";
  } else {
    animateNavLinks = "show";
  }

  const router = useRouter();

  const [selectedLink, setSelectedLink] = useState<string | null>()
  useEffect(() => {
    const slicedPath = router.pathname.slice(1, router.pathname.length);
    setSelectedLink(slicedPath)
  }, [router.pathname])

  const linkBasicClass = styles["link__container"];
  const linkActiveClass = `${styles["link__container"]} ${styles['link--active']}`

  return (
    <Fragment>
      <ul className={styles["nav-links__main"]}>
      <li className={selectedLink === "movies" ? linkActiveClass : linkBasicClass}>
          <Link href="/movies">
            <a className={styles["link"]}>MOVIES</a>
          </Link>
        </li>
        <li className={selectedLink === "series" ? linkActiveClass : linkBasicClass}>
          <Link href="/series">
            <a className={styles["link"]}>SERIES</a>
          </Link>
        </li>
        <li className={selectedLink === "people" ? linkActiveClass : linkBasicClass}>
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
        <motion.li variants={navLinksVariants} className={selectedLink === "movies" ? linkActiveClass : linkBasicClass}>
          <Link href="/movies">
            <a className={styles["link"]}>MOVIES</a>
          </Link>
        </motion.li>
        <motion.li variants={navLinksVariants} className={selectedLink === "series" ? linkActiveClass : linkBasicClass}>
          <Link href="/series">
            <a className={styles["link"]}>SERIES</a>
          </Link>
        </motion.li>
        <motion.li variants={navLinksVariants} className={selectedLink === "people" ? linkActiveClass : linkBasicClass}>
          <Link href="/people">
            <a className={styles["link"]}>PEOPLE</a>
          </Link>
        </motion.li>
      </motion.ul>
    </Fragment>
  );
};

export default NavbarLinks;
