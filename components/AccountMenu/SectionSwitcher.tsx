import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./styles/SectionSwitcher.module.scss";
import SwitcherOption from "./SwitcherOption";

const SectionSwitcher: React.FC = (props) => {
  let chosenSection = {
    toWatch: { option: false, text: "To-Watch List" },
    account: { option: false, text: "Account" },
    settings: { option: false, text: "Settings" },
  };

  const router = useRouter();
  switch (router.query.section) {
    case "settings":
      chosenSection = {...chosenSection, settings: {option: true, text: "Settings"}}
      break;
    case "to-watch":
      chosenSection = {...chosenSection, toWatch: {option: true, text: "To-Watch List"}}
      break;
    case "dasboard":
    chosenSection = {...chosenSection, account: {option: true, text: "Account"}};
      break;
  }

  const allOptions = Object.keys(chosenSection).map((option, i) => {
    const optionObj = chosenSection[option as keyof typeof chosenSection];
    return <SwitcherOption key={`sectionOption${i}`} option={optionObj.option} text={optionObj.text} />;
  });

  return (
    <aside className={styles["section-switcher"]}>
      <ul className={styles["section-switcher__options"]}>{allOptions}</ul>
    </aside>
  );
};

export default SectionSwitcher;
