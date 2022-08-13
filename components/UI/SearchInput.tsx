import styles from "./styles/SearchInput.module.scss";
import React, { ChangeEvent, FormEvent, useState } from "react";
import StyledButton from "./StyledButton";
import { useRouter } from "next/router";

const SearchInput: React.FC<{ className?: string; placeholder?: string }> = (
  props
) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: {q: searchInput}
    })
  };

  return (
    <form onSubmit={submitHandler} className={styles["main-search__container"]}>
      <input
        value={searchInput}
        onChange={searchChangeHandler}
        placeholder={props.placeholder}
        className={styles["main-search__input"]}
        type="text"
      ></input>
      <StyledButton addClass={styles["main-search__button"]}>
        Search
      </StyledButton>
    </form>
  );
};

export default SearchInput;
