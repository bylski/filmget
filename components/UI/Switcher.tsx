import React from "react";
import styles from "./styles/Switcher.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

const Switcher: React.FC<{
  switches: { switchName: string }[] | null;
  onSwitch: (activeSwitchNum: number) => void;
}> = (props) => {
  const [currentlySelected, setCurentlySelected] = useState(0);
  const switchClickedHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLUListElement;
    const slicedId = target.id.slice(6, target.id.length);
    setCurentlySelected(parseInt(slicedId));
    props.onSwitch(parseInt(slicedId))
  };

  if (props.switches !== null) {
  const allSwitches = props.switches.map((currentSwitch, i) => {
    return (
      <li
        className={
          i === props.switches!.length - 1
            ? `${styles["switcher-element"]} ${styles["last"]}`
            : styles["switcher-element"]
        }
        id={`switch${i}`}
        key={`switch${i}`}
        onClick={switchClickedHandler}
      >
        <h1 className={styles["switcher-element__text"]}>
          {currentSwitch.switchName}
        </h1>
        {currentlySelected === i ? (
          <motion.div
            layoutId="background"
            className={styles["switcher-element__animated-bg"]}
          ></motion.div>
        ) : null}
      </li>
    );
  });

  return <ul className={styles["switcher"]}>{allSwitches}</ul>;
} else return null;
}

export default Switcher;
