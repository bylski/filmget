import React, { useState, useEffect } from "react";
import styles from "./styles/DetailsHeader.module.scss";
import {
  actorInterface,
  movieInterface,
  seriesInterface,
} from "../../utils/types";
import EyeIcon from "../Icons/EyeIcon";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import { accountActions } from "../../redux/store";
import { motion } from "framer-motion";

const DetailsHeader: React.FC<{
  modalData: movieInterface | actorInterface | seriesInterface;
  genresString?: string;
  dataType: string;
}> = (props) => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const [wantToWatch, setWantToWatch] = useState(false);
  const [wantToWatchClasses, setWantToWatchClasses] = useState("");
  const [wantToWatchTitle, setWantToWatchTitle] = useState(
    'Add to "Want to watch"'
  );


  const wantToWatchClickHandler = async () => {
    setWantToWatch((prev) => !prev);

    const baseConditions =
      (session.status === "authenticated" && "title" in props.modalData) ||
      "name" in props.modalData;

    if (baseConditions && !wantToWatch) {
      await axios
        .post("/api/add-to-watch", {
          username: session.data?.user?.name,
          media: props.modalData,
        })
        .then((res) => {
          // If query was successful => add media to redux state
          if (res.data) {
            dispatch(accountActions.addToWatch(props.modalData));
          }
        });
    } else if (baseConditions && wantToWatch) {
      await axios
        .post("/api/remove-to-watch", {
          username: session.data?.user?.name,
          media: props.modalData,
        })
        .then((res) => {
          if (res.data) {
            dispatch(accountActions.deleteToWatch(props.modalData));
          }
        });
    }
  };

    // Check if media is already added to "want to watch"
    const mediaToWatchIds = useAppSelector((state) => state.account.toWatch.mediaIds)


  useEffect(() => {
    // const checkToWatch = async () => {
    //   const res = await axios.get("api/get-to-watch", {
    //     params: { id: props.modalData.id, username: session.data?.user?.name },
    //   });

    //     if (res.data.wantToWatch) {
    //       setWantToWatch(true);
    //     } else if (!res.data.wantToWatch && !wantToWatch) {
    //       setWantToWatch(false);
    //     }
    // };


    if (session.status === "authenticated") {
      // checkToWatch();
      let isWantToWatch = false;
      for (let mediaId of mediaToWatchIds) {
        console.log(`${mediaId}`, props.modalData.id)
        console.log("HERE")
        if (mediaId === props.modalData.id) {
          console.log("YAH")
          isWantToWatch = true;
        } 
      }

      if (isWantToWatch) {
        setWantToWatch(true);
      } else {
        setWantToWatch(false);
      }
    }

    if (wantToWatch) {
      setWantToWatchTitle('Remove from "Want to watch"');
      setWantToWatchClasses(styles["active"]);
    } else {
      setWantToWatchClasses(styles["unactive"]);
      setWantToWatchTitle('Add to "Want to watch"');
    }
  }, [wantToWatch, mediaToWatchIds]);

  if (
    props.dataType === "movie" ||
    (props.dataType === "series" && "genresList" in props.modalData)
  ) {


    return (
      <header className={styles["info__header"]}>
        <div className={styles["header__info-section"]}>
          <h1 className={styles["header__title"]}>
            {"title" in props.modalData ? props.modalData.title : null}{" "}
            {"name" in props.modalData ? props.modalData.name : null}{" "}
            <span>
              {"release_date" in props.modalData
                ? `(${props.modalData.release_date.slice(0, 4)})`
                : null}
              {"first_air_date" in props.modalData
                ? `(${props.modalData.first_air_date.slice(0, 4)})`
                : null}
            </span>
          </h1>
          <p className={styles["header__genres"]}>{props.genresString}</p>
        </div>
        {session.status === "authenticated" ? (
          <div className={styles["header__input-section"]}>
            <button
              onClick={wantToWatchClickHandler}
              title={wantToWatchTitle}
              className={`${styles["input-btn__to-watch"]} ${wantToWatchClasses}`}
            >
              <p className={`${styles["btn__label"]} ${wantToWatchClasses}`}>
                Want to watch
              </p>
              <EyeIcon
                className={`${styles["btn__icon"]} ${wantToWatchClasses}`}
              ></EyeIcon>
            </button>
          </div>
        ) : null}
      </header>
    );
  } else if (props.dataType === "actor" && "gender" in props.modalData) {
    let actorsGender: string;
    switch (props.modalData.gender) {
      case 1:
        actorsGender = "Female";
        break;
      case 2:
        actorsGender = "Male";
        break;
      default:
        actorsGender = "Other";
        break;
    }

    return (
      <header className={styles["people-info__header"]}>
        <h1 className={styles["header__name"]}>{props.modalData.name}</h1>
        <p className={styles["header__gender"]}>{`Gender - ${actorsGender}`}</p>
      </header>
    );
  } else {
    return <h1 style={{ color: "white" }}>SOMETHING WENT WRONG</h1>;
  }
};

export default DetailsHeader;
