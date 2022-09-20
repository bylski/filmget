import React, { useEffect } from "react";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import useValidation from "../../utils/hooks/useValidation";
import StyledButton from "../UI/StyledButton";
import RegisterImageCarousel from "./RegisterImageCarousel";
import RegisterInputs from "./RegisterInputs";
import styles from "./styles/Register.module.scss";

const Register: React.FC<{ movieUrls: string[] }> = (props) => {
  const inputsData = useAppSelector((state) => state.registerInputs);
  
  const [validationState, dispatchValidation] = useValidation(inputsData)

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    dispatchValidation({type: "validateInputs"})
  };


  return (
    <main className={styles["register-login"]}>
      <div className={styles["register-login__card"]}>
        <RegisterImageCarousel urls={props.movieUrls} />
        <div className={styles["card__form-section"]}>
          <form onSubmit={onSubmitHandler} className={styles["card__form"]}>
            <h1 className={styles["form__header-text"]}>Create Account</h1>
            <RegisterInputs />
            <div className={styles["form__footer"]}>
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
