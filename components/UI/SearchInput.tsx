import styles from './styles/SearchInput.module.scss'
import React from 'react';

const SearchInput:React.FC<{className?: string, placeholder?: string}> = (props) => {
    return (
        <form className={styles["main-search__container"]}>
          <input placeholder={props.placeholder} className={styles["main-search__input"]} type="text"></input>
          <button className={styles["main-search__button"]}>Search</button>
        </form>
    )
}

export default SearchInput;