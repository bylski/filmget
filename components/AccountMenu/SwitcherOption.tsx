import React from "react";
import AccountIcon from "../Icons/AccountIcon";
import EyeIcon from "../Icons/EyeIcon";
import styles from "./styles/SectionSwitcher.module.scss";
import SettingsIcon from "../Icons/SettingsIcon";
const SwitcherOption: React.FC<{ option: boolean; text: string }> = (props) => {
  let optionsIcon = null;
  let iconClass = props.option
    ? `${styles["option__icon"]} ${styles["active"]}`
    : styles["option__icon"];
  if (props.text === "Account") {
    optionsIcon = <AccountIcon className={iconClass} />;
  } else if (props.text === "Settings") {
    optionsIcon = <SettingsIcon className={iconClass} />;
  } else if (props.text === "To-Watch List") {
    optionsIcon = <EyeIcon className={iconClass} />;
  }

  return (
    <li
      className={
        props.option
          ? `${styles["section-switcher__option"]} ${styles["active"]} }`
          : styles["section-switcher__option"]
      }
    >
      <p className={props.option ? styles["active"] : ""}>{props.text}</p>
      {optionsIcon}
    </li>
  );
};

export default SwitcherOption;
