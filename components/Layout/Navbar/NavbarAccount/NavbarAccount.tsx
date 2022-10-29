import { useState, useEffect } from "react";
import styles from "../../styles/Navbar/NavbarAccount.module.scss";
import ArrowDownIcon from "../../../Icons/ArrowDownIcon";
import { Session } from "next-auth";
import CollapsableMenu from "./CollapsableMenu";
import Link from "next/link";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/hooks/reduxHooks";
import { accountActions } from "../../../../redux/store";
import { useSelector } from "react-redux";
const NavbarAccount: React.FC<{ accountData: Session }> = (props) => {
  const [accountMenuShow, setAccountMenuShow] = useState(false);
  const dispatch = useAppDispatch();
  const { accountData } = props;

  useEffect(() => {
    dispatch(accountActions.setAvatarSrc(accountData.user?.image));
    dispatch(accountActions.setUsername(accountData.user?.name));
  }, [accountData.user]);

  let arrowIconClasses = styles["nav-account__arrow-icon"];
  if (accountMenuShow) {
    arrowIconClasses = `${styles["nav-account__arrow-icon"]} ${styles["active"]}`;
  }

  const { avatarSrc, username } = useAppSelector((state) => ({
    avatarSrc: state.account.avatarSrc,
    username: state.account.username,
  }));

  return (
    <div className={styles["nav-account"]}>
      <Link href={{ pathname: "/account", query: { section: "dashboard" } }}>
        <a>
          <div className={styles["nav-account__avatar-icon"]}>
            <img
              src={avatarSrc || "/avatar.png"}
              className={styles["nav-account__avatar-img"]}
            ></img>
          </div>
        </a>
      </Link>
      <Link href={{ pathname: "/account", query: { section: "dashboard" } }}>
        <a className={styles["nav-account__username"]}>{username}</a>
      </Link>
      <button
        onClick={() => setAccountMenuShow((prev) => !prev)}
        onBlur={() => setAccountMenuShow(false)}
        className={styles["nav-account__arrow-btn"]}
      >
        <ArrowDownIcon className={arrowIconClasses} />
      </button>
      <CollapsableMenu isMenuShown={accountMenuShow} />
    </div>
  );
};

export default NavbarAccount;
