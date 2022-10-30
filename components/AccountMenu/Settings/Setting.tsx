import React, { Fragment, ReducerAction, useReducer, useState } from "react";
import StyledButton from "../../UI/StyledButton";
import styles from "./styles/Settings.module.scss";
import AvatarSetting from "./AvatarSetting";
import { Session } from "next-auth";
import axios from "axios";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { accountActions } from "../../../redux/store";
import { signOut, useSession } from "next-auth/react";

// PROPS TYPE DEFINITION
type SettingProps =
  | {
      headerText: string;
      type: "inputs";
      apiAddress?: string;
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

// INPUTS STATE LOGIC
type InputsActions = {
  type: "setInput";
  inputData: { value: string; id: string };
};
type Inputs = { value: string; id: string }[];
const inputsInitialState: Inputs = [];
const inputsReducer = (state: Inputs, action: InputsActions) => {
  switch (action.type) {
    case "setInput":
      // Save copy of the state to change it
      let newState = state;
      for (let inputState of state) {
        // Check if input's id already exists
        if (inputState.id === action.inputData.id) {
          // If it does, delete the old state from copy array
          const indexToDelete = newState.indexOf(action.inputData);
          newState.splice(indexToDelete, 1);
        }
      }
      // Populate new state with new data
      newState = [...newState, action.inputData];
      return newState;
    default:
      throw new Error();
  }
};

// COMPONENT

const Setting: React.FC<SettingProps> = (props) => {
  const session = useSession();
  const reduxDispatch = useAppDispatch();
  const [inputsState, inputsDispatch] = useReducer(
    inputsReducer,
    inputsInitialState
  );
  const [requestSuccess, setRequestSuccess] = useState<null | boolean>(null);
  const [requestMessage, setRequestMessage] = useState("");
  if (props.type === "inputs") {
    const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Send request to perform an action
      let isFieldEmpty = false;
      for (let state of inputsState) {
        if (state.value.trim() === "") isFieldEmpty = true;
      }

      if (!isFieldEmpty && inputsState.length !== 0) {
        if (props.apiAddress) {
          const username = session.data?.user?.name;
          const res = await axios.post(props.apiAddress, {
            data: inputsState,
            currentUsername: username,
          });
          if (res.data.success) {
            setRequestSuccess(true);
            signOut();
          } else {
            setRequestSuccess(false);
          }
          setRequestMessage(res.data.message);
        }
      } else {
        setRequestSuccess(false);
        setRequestMessage("Fill out all the input fields!");
      }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Retrieve state from input and dispatch action to save it as state
      const value = e.target.value;
      const id = e.target.id;
      inputsDispatch({
        type: "setInput",
        inputData: {
          value,
          id,
        },
      });
    };

    let errorMessage: null | JSX.Element = null;
    if (requestSuccess === true) {
      errorMessage = (
        <p className={`${styles["message"]} ${styles["success"]}`}>
          {requestMessage}
        </p>
      );
    } else if (requestSuccess === false) {
      errorMessage = (
        <p className={`${styles["message"]} ${styles["fail"]}`}>
          {requestMessage}
        </p>
      );
    } else {
      errorMessage = null;
    }

    const allInputs = props.inputs.map((input, i) => {
      return (
        <li key={`setting${i}`} className={styles["setting__input"]}>
          <label htmlFor={input.id} className={styles["input__label"]}>
            {input.label}
          </label>
          <input
            onChange={inputChangeHandler}
            placeholder={input.placeholder}
            id={input.id}
            type={input.type}
            className={
              requestSuccess === false
                ?  `${styles["input__input"]} ${styles["fail"]}`
                :  styles["input__input"]
            }
          ></input>
        </li>
      );
    });

    return (
      <form onSubmit={submitFormHandler} className={styles["setting"]}>
        <h2 className={styles["setting__name"]}>{props.headerText}</h2>
        <ul className={styles["setting__inputs"]}>{allInputs}</ul>
        {errorMessage}
        <StyledButton addClass={styles["setting__btn"]}>Submit</StyledButton>
      </form>
    );
  } else if (props.type === "avatarChange") {
    return (
      <AvatarSetting
        sessionData={props.sessionData}
        headerText={props.headerText}
      />
    );
  } else {
    return null;
  }
};

export default Setting;
