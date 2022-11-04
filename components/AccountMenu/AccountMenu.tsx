import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { movieInterface, seriesInterface } from "../../utils/types";
import Dashboard from "./Dashboard";
import SectionSwitcher from "./SectionSwitcher/SectionSwitcher";
import Settings from "./Settings/Settings";
import styles from "./styles/AccountMenu.module.scss";
import ToWatchList from "./ToWatchList/ToWatchList";


const AccountMenu: React.FC<{
  genresList: { id: number; name: string }[];
  signUpDate: Date | null;
  mediaToWatch: movieInterface[] | seriesInterface[];
  mediaIds: number[];
  mediaRatingsAmount: number;
  mostWatchedGenre: string
  mediaUserLiked: Array<movieInterface | seriesInterface>;
}> = (props) => {
  const session = useSession();

  let currentSection: JSX.Element | null = null;
  const router = useRouter();

  switch (router.query.section) {
    case "settings":
      currentSection = <Settings sessionData={session.data} />;
      break;
    case "to-watch":
      currentSection = (
        <ToWatchList
          genresList={props.genresList}
          mediaToWatch={props.mediaToWatch}
          mediaIds={props.mediaIds}
        />
      );
      break;
    default:
      currentSection = (
        <Dashboard
          ratedMediaAmount={props.mediaRatingsAmount}
          toWatchAmount={props.mediaIds.length}
          signUpDate={props.signUpDate}
          genresList={props.genresList}
          mediaUserLiked={props.mediaUserLiked}
          sessionData={session.data}
          mostWatchedGenre={props.mostWatchedGenre}
        />
      );
  }

  return (
    <section className={styles["account-menu"]}>
      <div className={styles["account-menu__card"]}>
        <SectionSwitcher />
        {session.status !== "loading" &&
          session.status === "authenticated" &&
          currentSection}
      </div>
    </section>
  );
};

export default AccountMenu;
