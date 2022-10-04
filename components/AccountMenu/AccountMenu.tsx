import { useSession } from "next-auth/react";
import React from "react";
import MoviesScroller from "../MoviesScroller/MoviesScroller";
import SectionSwitcher from "./SectionSwitcher";
import styles from "./styles/AccountMenu.module.scss";
import movieScrollerStyles from "./styles/MovieScrollerCustom.module.scss"

const AccountMenu: React.FC = (props) => {
  const session = useSession();

  const data = [
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },{
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },
    {
      "adult": false,
      "backdrop_path": "/y2Ca1neKke2mGPMaHzlCNDVZqsK.jpg",
      "id": 718930,
      "title": "Bullet Train",
      "original_language": "en",
      "original_title": "Bullet Train",
      "overview": "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
      "poster_path": "/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg",
      "media_type": "movie",
      "genre_ids": [
        28,
        35,
        53
      ],
      "popularity": 5678.208,
      "release_date": "2022-07-03",
      "video": false,
      "vote_average": 7.483,
      "vote_count": 1204
    },

  ]

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
            <MoviesScroller customStyles={movieScrollerStyles} headerText="Highest Rated " moviesData={data} genresList={[{id: 1, name: "bla"}]}/>

            <div className={styles["section__content"]}></div>
          </main>
        )}
      </div>
    </section>
  );
};

export default AccountMenu;
