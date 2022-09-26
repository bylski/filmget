import { useState } from "react";
import styles from "../../styles/Navbar/NavbarAccount.module.scss";
import ArrowDownIcon from "../../../Icons/ArrowDownIcon";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import CollapsableMenu from "./CollapsableMenu";
const NavbarAccount: React.FC<{ accountData: Session }> = (props) => {
  const username = props.accountData.user?.name;
  const [accountMenuShow, setAccountMenuShow] = useState(false);

  let arrowIconClasses = styles["nav-account__arrow-icon"];
  if (accountMenuShow) {
    arrowIconClasses = `${styles["nav-account__arrow-icon"]} ${styles["active"]}`
  }

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
        onClick={() => setAccountMenuShow(prev => !prev)}
        className={styles["nav-account__arrow-btn"]}
      >
        <ArrowDownIcon className={arrowIconClasses} />
      </button>
      <CollapsableMenu isMenuShown={accountMenuShow} />
    </div>
  );
};

export default NavbarAccount;
