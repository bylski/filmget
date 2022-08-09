import styles from './styles/SearchInput.module.scss'
import React from 'react';
import StyledButton from './StyledButton';

const SearchInput:React.FC<{className?: string, placeholder?: string}> = (props) => {
    return (
        <form className={styles["main-search__container"]}>
          <input placeholder={props.placeholder} className={styles["main-search__input"]} type="text"></input>
          <StyledButton addClass={styles["main-search__button"]}>Search</StyledButton>
        </form>
    )
}

export default SearchInput;