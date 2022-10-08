import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Dashboard from "./Dasboard";
import SectionSwitcher from "./SectionSwitcher";
import styles from "./styles/AccountMenu.module.scss";
import ToWatchList from "./ToWatchList";

const AccountMenu: React.FC = (props) => {
  const session = useSession();

  let currentSection: JSX.Element | null = <Dashboard sessionData={session.data}/>;
  const router = useRouter();
  switch (router.query.section) {
    case "settings":
      currentSection = null;
      break;
    case "to-watch":
      currentSection = <ToWatchList/>
      break;
  }

  return (
    <section className={styles["account-menu"]}>
      <div className={styles["account-menu__card"]}>
        <SectionSwitcher />
        {session.status !== "loading" && session.status === "authenticated" && (
          currentSection
        )}
      </div>
    </section>
  );
};

export default AccountMenu;
