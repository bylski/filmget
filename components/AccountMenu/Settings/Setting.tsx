import React from "react";
import StyledButton from "../../UI/StyledButton";
import styles from "../styles/Settings.module.scss";
import Image from "next/image";

type SettingProps =
  | {
      headerText: string;
      type: "inputs";
      inputs: {
        label: string;
        type: "text" | "password";
        id: string;
        placeholder?: string;
      }[];
    }
  | {
      headerText: string;
      type: "avatarChange";
    };

const Setting: React.FC<SettingProps> = (props) => {
  if (props.type === "inputs") {
    const allInputs = props.inputs.map((input, i) => {
      return (
        <li className={styles["setting__input"]}>
          <label htmlFor={input.id} className={styles["input__label"]}>
            {input.label}
          </label>
          <input
            placeholder={input.placeholder}
            id={input.id}
            type={input.type}
            className={styles["input__input"]}
          ></input>
        </li>
      );
    });

    return (
      <section className={styles["setting"]}>
        <h2 className={styles["setting__name"]}>{props.headerText}</h2>
        <ul className={styles["setting__inputs"]}>{allInputs}</ul>
        <StyledButton addClass={styles["setting__submit-btn"]}>
          Submit
        </StyledButton>
      </section>
    );
  } else if (props.type === "avatarChange") {
    return (
      <section className={styles["setting"]}>
         <h2 className={styles["setting__name"]}>{props.headerText}</h2>
         <div className={styles["avatar-img"]}>
        <Image width={500} height={500} src={"/avatar.png"}></Image>
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default Setting;
