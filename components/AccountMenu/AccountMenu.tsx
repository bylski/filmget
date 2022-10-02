import { useSession } from "next-auth/react";
import React from "react";
import SectionSwitcher from "./SectionSwitcher";
import styles from "./styles/AccountMenu.module.scss";

const AccountMenu: React.FC = (props) => {
  const session = useSession();

  return (
    <section className={styles["account-menu"]}>
      <div className={styles["account-menu__card"]}>
        <SectionSwitcher />
        {session.status !== "loading" && session.status === "authenticated" && (
          <main className={styles["account-section"]}>
            <header className={styles["section__header"]}>
              <p className={styles["header__username"]}>
                {session.data!.user!.name?.toUpperCase()}
              </p>
              <span>On Filmget since - 2 September 2022</span>
            </header>
            <div className={styles["section__content"]}></div>
          </main>
        )}
      </div>
    </section>
  );
};

export default AccountMenu;
