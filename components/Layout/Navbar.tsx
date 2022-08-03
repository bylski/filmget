import React, { ChangeEvent } from "react";
import styles from "./styles/Navbar.module.scss";
import { useRouter } from "next/router";
import BrandIcon from "../Icons/BrandIcon";

const Navbar: React.FC = () => {
  const router = useRouter();

  const brandClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    router.push("/home");
  };

  return (
    <nav onClick={brandClickHandler} className={styles["nav-container"]}>
      <div className={styles["brand"]}>
      <BrandIcon className={styles["brand__icon"]} />
        <p className={styles["brand__text"]}>FILMGET</p>
        
      </div>
      <div className={styles["nav-links"]}>
        <div className={styles["link"]}>
          <p>MOVIES</p>
        </div>
        <div className={styles["link"]}>
          <p>SERIES</p>
        </div>
        <div className={styles["link"]}>
          <p>ACCOUNT</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
