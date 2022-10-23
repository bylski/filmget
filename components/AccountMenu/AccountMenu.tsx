import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { movieInterface, seriesInterface } from "../../utils/types";
import Dashboard from "./Dashboard";
import SectionSwitcher from "./SectionSwitcher/SectionSwitcher";
import Settings from "./Settings/Settings";
import styles from "./styles/AccountMenu.module.scss";
import ToWatchList from "./ToWatchList/ToWatchList";


const data = [
  {
    adult: false,
    backdrop_path: "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
    id: 718930,
    title: "Bullet Train",
    original_language: "en",
    original_title: "Bullet Train",
    overview:
      "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
    poster_path: "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
    media_type: "movie",
    genre_ids: [28, 35, 53],
    popularity: 5678.208,
    release_date: "2022-07-03",
    video: false,
    vote_average: 7.483,
    vote_count: 1204,
  },
  {
    adult: false,
    backdrop_path: "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
    id: 718930,
    title: "Bullet Train",
    original_language: "en",
    original_title: "Bullet Train",
    overview:
      "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
    poster_path: "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
    media_type: "movie",
    genre_ids: [28, 35, 53],
    popularity: 5678.208,
    release_date: "2022-07-03",
    video: false,
    vote_average: 7.483,
    vote_count: 1204,
  },
  {
    adult: false,
    backdrop_path: "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
    id: 718930,
    title: "Bullet Train",
    original_language: "en",
    original_title: "Bullet Train",
    overview:
      "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
    poster_path: "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
    media_type: "movie",
    genre_ids: [28, 35, 53],
    popularity: 5678.208,
    release_date: "2022-07-03",
    video: false,
    vote_average: 7.483,
    vote_count: 1204,
  },
  {
    adult: false,
    backdrop_path: "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
    id: 718930,
    title: "Bullet Train",
    original_language: "en",
    original_title: "Bullet Train",
    overview:
      "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
    poster_path: "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
    media_type: "movie",
    genre_ids: [28, 35, 53],
    popularity: 5678.208,
    release_date: "2022-07-03",
    video: false,
    vote_average: 7.483,
    vote_count: 1204,
  },
  {
    adult: false,
    backdrop_path: "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
    id: 718930,
    title: "Bullet Train",
    original_language: "en",
    original_title: "Bullet Train",
    overview:
      "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
    poster_path: "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
    media_type: "movie",
    genre_ids: [28, 35, 53],
    popularity: 5678.208,
    release_date: "2022-07-03",
    video: false,
    vote_average: 7.483,
    vote_count: 1204,
  },
  {
    adult: false,
    backdrop_path: "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
    id: 718930,
    title: "Bullet Train",
    original_language: "en",
    original_title: "Bullet Train",
    overview:
      "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
    poster_path: "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
    media_type: "movie",
    genre_ids: [28, 35, 53],
    popularity: 5678.208,
    release_date: "2022-07-03",
    video: false,
    vote_average: 7.483,
    vote_count: 1204,
  },
  {
    adult: false,
    backdrop_path: "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
    id: 718930,
    title: "Bullet Train",
    original_language: "en",
    original_title: "Bullet Train",
    overview:
      "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
    poster_path: "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
    media_type: "movie",
    genre_ids: [28, 35, 53],
    popularity: 5678.208,
    release_date: "2022-07-03",
    video: false,
    vote_average: 7.483,
    vote_count: 1204,
  },
];


const AccountMenu: React.FC<{genresList: {id: number, name: string}[]}> = (props) => {
  const session = useSession();

  let currentSection: JSX.Element | null = null;
  const router = useRouter();

 
  switch (router.query.section) {
    case "settings":
      currentSection = <Settings/>
      break;
    case "to-watch":
      currentSection = <ToWatchList genresList={props.genresList} movieData={data}/>
      break;
    default: 
      currentSection = <Dashboard genresList={props.genresList} movieData={data} sessionData={session.data}/>
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
