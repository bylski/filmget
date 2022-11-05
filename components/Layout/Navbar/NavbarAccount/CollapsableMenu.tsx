import React from "react";
import styles from "../../styles/Navbar/CollapsableMenu.module.scss";
import LogOutIcon from "../../../Icons/LogOutIcon";
import { AnimatePresence, motion } from "framer-motion";
import {
  accountLinksVariants,
  accountMenuVariants,
} from "../../../../utils/AnimationVariants.ts/NavbarVariants";
import { signOut } from "next-auth/react";
import SettingsIcon from "../../../Icons/SettingsIcon";
import Link from "next/link";
import EyeIcon from "../../../Icons/EyeIcon";

const CollapsableMenu: React.FC<{ isMenuShown: boolean }> = (props) => {
  return (
    <AnimatePresence>
      {props.isMenuShown && (
        <motion.div
          variants={accountMenuVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className={styles["collapsable-menu"]}
        >
          <motion.ul className={styles["menu__items"]}>
            <Link href={{pathname: "account", query: {section: "to-watch"}}}>
            <motion.li
              variants={accountLinksVariants}
              className={`${styles["menu__item"]} ${styles["with-icon"]}`}
            >
              To-Watch List
              <EyeIcon className={styles["icon"]}/>
            </motion.li>
            </Link>
            <Link href={{pathname: "account", query: {section: "settings"}}}>
            <motion.li
              variants={accountLinksVariants}
              className={`${styles["menu__item"]} ${styles["with-icon"]}`}
            >
              <p className={styles["item__text"]}>Settings</p>
              <SettingsIcon className={styles["icon"]} />
            </motion.li>
            </Link>
            <motion.li
              variants={accountLinksVariants}
              className={`${styles["menu__item"]} ${styles["with-icon"]}`}
              onClick={() => signOut()}
            >
              <p className={styles["item__text"]}>Log Out</p>
              <LogOutIcon className={styles["icon"]} />
            </motion.li>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CollapsableMenu;
