import React, { Fragment } from "react";
import AccountIcon from "../Icons/AccountIcon";
import EyeIcon from "../Icons/EyeIcon";
import styles from "./styles/SectionSwitcher.module.scss";
import SettingsIcon from "../Icons/SettingsIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
const SwitcherOption: React.FC<{ option: boolean; text: string }> = (props) => {
  let optionsIcon = null;
  let iconQuery = "";
  let iconClass = props.option
    ? `${styles["option__icon"]} ${styles["active"]}`
    : styles["option__icon"];
  
  switch (props.text) {
    case "Account":
      optionsIcon = <AccountIcon className={iconClass} />;
      iconQuery = "dasboard"
      break;
    case "Settings":
      optionsIcon = <SettingsIcon className={iconClass} />;
      iconQuery = "settings"
      break;
    case "To-Watch List":
      optionsIcon = <EyeIcon className={iconClass} />;
      iconQuery = "to-watch"
      break;
  }

  const router = useRouter();
  const linkClickHandler = () => {
    router.push({
      pathname: "/account",
      query: {section: iconQuery}
    })
  }

  return (
    <Fragment>
      <motion.li
        onClick={linkClickHandler}
        className={
          props.option
            ? `${styles["section-switcher__option"]} ${styles["active"]} }`
            : styles["section-switcher__option"]
        }
      >
        <p className={props.option ? styles["active"] : ""}>{props.text}</p>
        {optionsIcon}
        {props.option ? <motion.div layoutId="optionUnderline" className={styles["underline"]}></motion.div>: null}
      </motion.li>
      </Fragment>);
};

export default SwitcherOption;
