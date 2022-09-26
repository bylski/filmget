import React from "react";
import styles from "../../styles/Navbar/CollapsableMenu.module.scss";
import LogOutIcon from "../../../Icons/LogOutIcon";
import { AnimatePresence, motion } from "framer-motion";
import {
  accountLinksVariants,
  accountMenuVariants,
} from "../../../../utils/AnimationVariants.ts/NavbarVariants";
import { signOut } from "next-auth/react";

const CollapsableMenu: React.FC<{ isMenuShown: boolean }> = (props) => {
  return (
    <AnimatePresence>
      {props.isMenuShown && <motion.div
        variants={accountMenuVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className={styles["collapsable-menu"]}
      >
        <motion.ul className={styles["menu__items"]}>
          <motion.li
            variants={accountLinksVariants}
            className={styles["menu__item"]}
          >
            To-Watch List
          </motion.li>
          <motion.li
            variants={accountLinksVariants}
            className={`${styles["menu__item"]} ${styles["logout"]}`}
            onClick={() => signOut()}
          >
            <p className={styles["logout__text"]}>Log Out</p>
            <LogOutIcon className={styles["logout__icon"]} />
          </motion.li>
        </motion.ul>
      </motion.div>}
    </AnimatePresence>
  );
};

export default CollapsableMenu;
