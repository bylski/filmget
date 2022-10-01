import { useSession } from "next-auth/react";
import React from "react";
import AccountIcon from "../Icons/AccountIcon";
import EyeIcon from "../Icons/EyeIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import styles from "./styles/AccountMenu.module.scss";

const AccountMenu: React.FC = (props) => {
  const session = useSession();

  return (
    <section className={styles["account-menu"]}>
      <div className={styles["account-menu__card"]}>
        <aside className={styles["section-switcher"]}>
          <ul className={styles["section-switcher__options"]}>
            <li className={styles["section-switcher__option"]}>
              <p>To-Watch List</p>
              <EyeIcon className={styles["option__icon"]} />
            </li>
            <li className={styles["section-switcher__option"]}>
              <p>Account</p>
              <AccountIcon className={styles["option__icon"]} />
            </li>
            <li className={styles["section-switcher__option"]}>
              <p>Settings</p>
              <SettingsIcon className={styles["option__icon"]} />
            </li>
          </ul>
        </aside>
        <main className={styles["account-section"]}>
          <header className={styles["section__header"]}>
            <p className={styles["header__username"]}>{session.data!.user!.name}</p>
          </header>
          <div className={styles["section__content"]}>

          </div>
        </main>
      </div>
    </section>
  );
};

export default AccountMenu;
