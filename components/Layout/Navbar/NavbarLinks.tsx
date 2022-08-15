import { Fragment } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Navbar.module.scss";
import { navLinksVariants } from "../../../utils/AnimationVariants.ts";
import { navMenuVariants } from "../../../utils/AnimationVariants.ts";


const NavbarLinks: React.FC<{navMenuShow: boolean}> = (props) => {

    let animateNavLinks: string = "";
    if (!props.navMenuShow) {
      animateNavLinks = "hidden";
    } else {
      animateNavLinks = "show";
    }

    return (
        <Fragment>
          <ul className={styles["nav-links__main"]}>
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
    
          <motion.ul
            variants={navMenuVariants}
            initial="hidden"
            animate={animateNavLinks}
            className={styles["nav-links__collapsable"]}
          >
            <motion.li variants={navLinksVariants} className={styles["link"]}>
              <p>MOVIES</p>
            </motion.li>
            <motion.li variants={navLinksVariants} className={styles["link"]}>
              <p>SERIES</p>
            </motion.li>
            <motion.li variants={navLinksVariants} className={styles["link"]}>
              <p>PEOPLE</p>
            </motion.li>
          </motion.ul>
        </Fragment>
      );
}

export default NavbarLinks;