import React, { Fragment } from "react";
import StyledButton from "../../UI/StyledButton";
import styles from "./styles/Settings.module.scss";
import AvatarSetting from "./AvatarSetting";
import { Session } from "next-auth";


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
      sessionData: Session | null;
    }
  | {
      headerText: string;
      type: "avatarChange";
      sessionData: Session | null;
    };

const Setting: React.FC<SettingProps> = (props) => {
  if (props.type === "inputs") {
    const allInputs = props.inputs.map((input, i) => {
      return (
        <li key={`setting${i}`} className={styles["setting__input"]}>
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
        <StyledButton addClass={styles["setting__btn"]}>Submit</StyledButton>
      </section>
    );
  } else if (props.type === "avatarChange") {
    return (
      <AvatarSetting sessionData={props.sessionData} headerText={props.headerText}/>
    );
  } else {
    return null;
  }
};

export default Setting;
