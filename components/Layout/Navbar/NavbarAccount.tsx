import react from "react";
import styles from "../styles/Navbar/NavbarAccount.module.scss"

const NavbarAccount: React.FC = () => {
  return (
    <div className={styles["nav-account"]}>
      <div className={styles["nav-account__avatar-icon"]}>
        <img
          src="avatar.png"
          className={styles["nav-account__avatar-img"]}
        ></img>
      </div>
      <p className={styles["nav-account__username"]}>Bylski</p>
      {/* <ArrowDownIcon className={styles["nav-account__arrow-icon"]}/> */}
    </div>
  );
};

export default NavbarAccount;
