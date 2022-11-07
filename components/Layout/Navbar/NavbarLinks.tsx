import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Navbar/NavbarLinks.module.scss";
import { navLinksVariants } from "../../../utils/AnimationVariants.ts";
import { navMenuVariants } from "../../../utils/AnimationVariants.ts";
import Link from "next/link";
import { useRouter } from "next/router";
import useBreakpoints from "../../../utils/hooks/useBreakpoints";
import { signOut, useSession } from "next-auth/react";
import LogOutIcon from "../../Icons/LogOutIcon";

const NavbarLinks: React.FC<{
  navMenuShow: boolean;
  linkOnClick: () => void;
}> = (props) => {
  let animateNavLinks: string = "";
  if (!props.navMenuShow) {
    animateNavLinks = "hidden";
  } else {
    animateNavLinks = "show";
  }

  const router = useRouter();
  const session = useSession();

  const [selectedLink, setSelectedLink] = useState<string | null>();
  useEffect(() => {
    const slicedPath = router.pathname.slice(1, router.pathname.length);
    setSelectedLink(slicedPath);
  }, [router.pathname]);

  const linkBasicClass = styles["link__container"];
  const linkActiveClass = `${styles["link__container"]} ${styles["link--active"]}`;

  const breakpoints: { [key: string]: boolean }[] | undefined = useBreakpoints({
    breakpointName: "collapsableMenu",
    breakpointVal: 950,
  });
  let collapseMenu: boolean = false;
  if (breakpoints !== undefined && breakpoints[0].collapsableMenu) {
    collapseMenu = true;
  }

  return (
    <Fragment>
      <ul className={styles["nav-links__main"]}>
        <li
          className={
            selectedLink === "movies" ? linkActiveClass : linkBasicClass
          }
        >
          <Link href="/movies">
            <a className={styles["link"]}>MOVIES</a>
          </Link>
        </li>
        <li
          className={
            selectedLink === "series" ? linkActiveClass : linkBasicClass
          }
        >
          <Link href="/series">
            <a className={styles["link"]}>SERIES</a>
          </Link>
        </li>
        <li
          className={
            selectedLink === "people" ? linkActiveClass : linkBasicClass
          }
        >
          <Link href="/people">
            <a className={styles["link"]}>PEOPLE</a>
          </Link>
        </li>
      </ul>

      {collapseMenu && (
        <motion.ul
          variants={navMenuVariants}
          initial="hidden"
          animate={animateNavLinks}
          className={styles["nav-links__collapsable"]}
        >
          <motion.li
            variants={navLinksVariants}
            className={
              selectedLink === "movies" ? linkActiveClass : linkBasicClass
            }
          >
            <Link href="/movies">
              <a onClick={props.linkOnClick} className={styles["link"]}>
                MOVIES
              </a>
            </Link>
          </motion.li>
          <motion.li
            variants={navLinksVariants}
            className={
              selectedLink === "series" ? linkActiveClass : linkBasicClass
            }
          >
            <Link href="/series">
              <a onClick={props.linkOnClick} className={styles["link"]}>
                SERIES
              </a>
            </Link>
          </motion.li>
          <motion.li
            variants={navLinksVariants}
            className={
              selectedLink === "people" ? linkActiveClass : linkBasicClass
            }
          >
            <Link href="/people">
              <a onClick={props.linkOnClick} className={styles["link"]}>
                PEOPLE
              </a>
            </Link>
          </motion.li>
          {/* if user is logged in, show log out link */}
          {session.data ? (
            <motion.li variants={navLinksVariants} className={linkBasicClass}>
              <a className={styles["link"]} onClick={() => signOut()}>
                LOG OUT
              </a>
              <LogOutIcon className={styles["link__icon"]} />
            </motion.li>
          ) : null}
          {/* If the user is not logged show login/register links. */}
          {!session.data ? (
            <Fragment>
              <motion.li
                variants={navLinksVariants}
                className={
                  selectedLink === "login" ? linkActiveClass : linkBasicClass
                }
              >
                <Link href="/login">
                  <a onClick={props.linkOnClick} className={styles["link"]}>
                    LOG IN
                  </a>
                </Link>
              </motion.li>
              <motion.li
                variants={navLinksVariants}
                className={
                  selectedLink === "register" ? linkActiveClass : linkBasicClass
                }
              >
                <Link href="/register">
                  <a onClick={props.linkOnClick} className={styles["link"]}>
                    REGISTER
                  </a>
                </Link>
              </motion.li>
            </Fragment>
          ) : null}
        </motion.ul>
      )}
    </Fragment>
  );
};

export default NavbarLinks;
