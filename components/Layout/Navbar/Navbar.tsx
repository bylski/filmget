import React, { useEffect, useState, Fragment } from "react";
import styles from "../styles/Navbar/Navbar.module.scss";
import { useRouter } from "next/router";
import { animate, motion } from "framer-motion";
import { navVariants } from "../../../utils/AnimationVariants.ts";
import BrandIcon from "../../Icons/BrandIcon";
import NavMenuIcon from "../../Icons/NavMenuIcon";
import useScrollActions from "../../../utils/hooks/useScrollActions";
import NavbarLinks from "./NavbarLinks";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";
import NavbarAccount from "./NavbarAccount/NavbarAccount";
import NavbarAccountLinks from "./NavbarAccountLinks";
import { useSession } from "next-auth/react";

const Navbar: React.FC = (props) => {
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

  const session = useSession();
  let navbarAccountLinks = null;
  // Check if should display navbarAccount menu or links (depending on being logged in)
  if (session.data) {
    navbarAccountLinks = <NavbarAccount accountData={session.data} />;
  } else if (!session.data && session.status !== "loading") {
    navbarAccountLinks = <NavbarAccountLinks />;
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
        {session.data && (
          <Fragment>
            <NavbarLinks
              linkOnClick={menuClickHandler}
              navMenuShow={navMenuShow}
            />
            {navbarAccountLinks}
          </Fragment>
        )}

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
