import React, { useState } from "react";
import styles from "./styles/AccountMenu.module.scss";
import SwitcherOption from "./SwitcherOption";

const SectionSwitcher: React.FC = (props) => {
  const [chosenSection, setChosenSection] = useState([
    { option: false, text: "To-Watch List" },
    { option: true, text: "Account" },
    { option: false, text: "Settings"},
  ]);
  const allOptions = chosenSection.map((option) => {
    return <SwitcherOption option={option.option} text={option.text}/>
  });

  return (
    <aside className={styles["section-switcher"]}>
      <ul className={styles["section-switcher__options"]}>
        {allOptions}
      </ul>
    </aside>
  );
};

export default SectionSwitcher;
