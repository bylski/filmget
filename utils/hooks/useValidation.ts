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
  };
  const initialValidationState: validationState = {
    username: { isValid: true },
    email: { isValid: true },
    password: { isValid: true },
  };

  const validationReducer = (
    state: validationState,
    action: { type: "validateInputs" }
  ) => {
    if (action.type === "validateInputs") {
      const newState = state;
      const { username, email, password } = inputsData;

      if (username.trim().length >= 18 || username.trim().length === 0) {
        newState.username.isValid = false;
      } else {
        newState.username.isValid = true;
      }

      if (email.length !== 0 && !email.includes("@")) {
        newState.email.isValid = false;
      } else {
        newState.email.isValid = true;
      }

      if (password.length < 8) {
        newState.password.isValid = false;
      } else {
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
          newState.password.isValid = true;
        } else {
          newState.password.isValid = false;
        }
      }
      
      return newState;
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
