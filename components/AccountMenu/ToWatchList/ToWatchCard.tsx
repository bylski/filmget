import React from 'react';
import styles from "../styles/ToWatchList.module.scss";
import Image from 'next/image';
import RatingIcon from '../../Icons/RatingIcon';

const ToWatchCard: React.FC<{movieData: any}> = (props) => {
    return (
        <div className={styles["media__card"]}>
            <div className={styles["card__img"]}>
              <Image
                width={600}
                height={900}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${props.movieData[0].poster_path}`}
              ></Image>
            </div>
            <div className={styles["card__info"]}>
              <div className={styles["info__rating"]}>
              <RatingIcon className={styles["rating__icon"]} />
                <p className={styles["rating__value"]}>{props.movieData[0].vote_average.toFixed(1)}</p>
              </div>
              <p className={styles["info__title"]}>
                {props.movieData[0].title}
              </p>
            </div>
          </div>
    )
}

export default ToWatchCard;