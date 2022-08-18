import styles from "./styles/SearchInput.module.scss";
import React, { ChangeEvent, FormEvent, useState } from "react";
import StyledButton from "./StyledButton";
import { useRouter } from "next/router";

const SearchInput: React.FC<{
  customClasses: {
    formClass: string | null;
    inputClass: string | null;
    buttonClass: string | null;
  };
  placeholder?: string;
  initialVal?: string;
}> = (props) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(props.initialVal ? props.initialVal : "");
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: searchInput },
    });
  };

  const customFormClass = props.customClasses.formClass !== null
    ? `${styles["search-input__form"]} ${props.customClasses.formClass}`
    : styles["search-input__form"];

    const customInputClass = props.customClasses.inputClass !== null
    ? `${styles["search-input__input"]} ${props.customClasses.inputClass}`
    : styles["search-input__input"];
    
    const customButtonClass = props.customClasses.buttonClass !== null
    ? `${styles["search-input__button"]} ${props.customClasses.buttonClass}`
    : styles["search-input__button"];


  return (
    <form onSubmit={submitHandler} className={customFormClass}>
      <input
        value={searchInput}
        onChange={searchChangeHandler}
        placeholder={props.placeholder}
        className={customInputClass}
        type="text"
      ></input>
      <StyledButton addClass={customButtonClass}>
        Search
      </StyledButton>
    </form>
  );
};

export default SearchInput;
