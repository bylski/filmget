import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import useValidation from "../../utils/hooks/useValidation";
import StyledButton from "../UI/StyledButton";
import RegisterImageCarousel from "./RegisterImageCarousel";
import RegisterInputs from "./RegisterInputs";
import styles from "./styles/Register.module.scss";

const Register: React.FC<{ movieUrls: string[] }> = (props) => {
  const inputsData = useAppSelector((state) => state.registerInputs);

  const [validationState, dispatchValidation] = useValidation(inputsData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    dispatchValidation({ type: "validateInputs" });
    setIsSubmitted(true);
  };


  // If user submitted form - check if validation passed the tests
  // (do it in useEffect and not in Submit handler to get latest state snapshot)
  const router = useRouter();
  useEffect(() => {
    const storePassword = async () => {
      const { username, email, password } = inputsData;
      try {
      await axios.post("/api/save-user", { username, email, password });
      } catch {
        throw new Error ("Failed to create account")
      }
    };

    console.log(inputsData)
    console.log(validationState)

    if (isSubmitted) {
      let validationPassed = true;
      for (let validation in validationState) {
        const validationResult =
          validationState[validation as keyof typeof validationState];
        // If one of the inputs isn't valid, set validation to not passed, don't send api request
        if ("isValid" in validationResult) {
          if (!validationResult.isValid) {
            validationPassed = false;
          }
        }
      }
      if (validationPassed) {
        storePassword();
        router.replace("/home")
      } 
    }

    setIsSubmitted(false);
  }, [isSubmitted]);

  const errorMessages = validationState.messages.map((message, i) => {
    return (
      <p key={`errorMsg${i}`} className={styles["form__error-text"]}>
        {message}
      </p>
    );
  });

  return (
    <main className={styles["register-login"]}>
      <div className={styles["register-login__card"]}>
        <RegisterImageCarousel urls={props.movieUrls} />
        <div className={styles["card__form-section"]}>
          <form onSubmit={onSubmitHandler} className={styles["card__form"]}>
            <h1 className={styles["form__header-text"]}>Create Account</h1>
            <RegisterInputs inputsValidation={validationState} />
            <div className={styles["form__footer"]}>
              <div className={styles["form__errors"]}>{errorMessages}</div>
              <StyledButton addClass={styles["form__submit-btn"]}>
                Submit Account
              </StyledButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
