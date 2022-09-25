import styles from "../styles/Navbar/NavbarAccount.module.scss";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
const NavbarAccount: React.FC<{ accountData: Session }> = (props) => {
  const username = props.accountData.user?.name;

  return (
    <div className={styles["nav-account"]}>
      <div className={styles["nav-account__avatar-icon"]}>
        <img
          src="avatar.png"
          className={styles["nav-account__avatar-img"]}
        ></img>
      </div>
      <p className={styles["nav-account__username"]}>{username}</p>
      <button
        onClick={() => signOut({ redirect: false })}
        className={styles["nav-account__arrow-btn"]}
      >
        <ArrowDownIcon className={styles["nav-account__arrow-icon"]} />
      </button>
    </div>
  );
};

export default NavbarAccount;
