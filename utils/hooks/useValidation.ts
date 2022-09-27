import { useReducer, useState, useEffect } from "react";

const useValidation = (inputsData: {
  username: string;
  email: string;
  password: string;
}) => {
  type validationState = {
    username: { isValid: boolean };
    email: { isValid: boolean };
    password: { isValid: boolean };
    messages: string[];
  };
  const initialValidationState: validationState = {
    username: { isValid: true },
    email: { isValid: true },
    password: { isValid: true },
    messages: [],
  };

  const validationReducer = (
    state: validationState,
    action: { type: "validateInputs" } | { type: "setValidation", payload: validationState}
  ) => {
    if (action.type === "validateInputs") {
      const newState = state;
      const { messages } = newState;
      const { username, email, password} = inputsData;
      const usernameTooShortMsg = "* Username can only have 18 characters";
      const passwordTooShortMsg = "* Password must have at least 8 characters"
      const passwordRequiredCharsMsg = "* Password must contain at least one large letter and digit";
      const invalidEmailMsg = "* Pass valid email"

      const removeMsg = (messages: string[], msg: string): void => {
        if (messages.includes(msg))  messages.splice(messages.indexOf(msg), 1)
      }
      const addMsg = (messages: string[], msg: string): void => {
        if (!messages.includes(msg)) messages.push(msg);
      }

      if (username.trim().length >= 18 || username.trim().length === 0) {
        newState.username.isValid = false;
        addMsg(messages, usernameTooShortMsg)
      } else {
        const errorMsg = "* Username can only have 18 characters"
        removeMsg(messages, usernameTooShortMsg)
        newState.username.isValid = true;
      }

      if (email.length !== 0 && !email.includes("@")) {
        newState.email.isValid = false;
        addMsg(messages, invalidEmailMsg)
      } else {
        newState.email.isValid = true;
        removeMsg(messages, invalidEmailMsg)
      }

      if (password.length < 8) {
        newState.password.isValid = false;
        addMsg(messages, passwordTooShortMsg)
        removeMsg(messages, passwordRequiredCharsMsg)
      } else {
        removeMsg(messages, passwordTooShortMsg)
        let hasLargeLetter = false;
        let hasDigit = false;
        for (let i = 0; i < password.length; i++) {
          let letter = password[i];
          // Check if there is an uppercase letter in the password
          if (
            letter.toUpperCase() === letter &&
            letter !== letter.toLowerCase() &&
            // Make sure that the current character isn't a digit (doesn't have uppercase and lowercase variant)
            letter.toLowerCase() !== letter.toUpperCase()
          ) {
            hasLargeLetter = true;
          }
          // Check if char is a digit
          if (/^\d$/.test(letter)) {
            hasDigit = true;
          }
        }
        if (hasLargeLetter && hasDigit) {
          removeMsg(messages, passwordRequiredCharsMsg)
          newState.password.isValid = true;
        } else {
          addMsg(messages, passwordRequiredCharsMsg)
          newState.password.isValid = false;
        }
      }

      return newState;
    } else if (action.type === "setValidation") {
      // Set state as manually passed validation object
      return action.payload;
    } else return state;
  };

  const [validationState, dispatchValidation] = useReducer(
    validationReducer,
    initialValidationState
  );

  const validatationUtilities: [validationState, typeof dispatchValidation] = [
    validationState,
    dispatchValidation,
  ];
  return validatationUtilities;
};

export default useValidation;
