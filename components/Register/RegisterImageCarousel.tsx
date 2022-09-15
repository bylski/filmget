import React from "react";
import styles from "./styles/RegisterImageCarousel.module.scss";
import useCarousel from "../../utils/hooks/useCarousel";

const RegisterImageCarousel: React.FC<{urls: string[]}> = (props) => {

    const carouselImages = useCarousel({
        urls: props.urls,
        switchDelayTime: 13000,
        carouselLimit: 4,
      });

    return (
        <div className={styles["card__img-section"]}>
          {carouselImages.map((url, i) => {
            let classes = styles["card__img"];
            if (url.init) {
              classes = `${styles["card__img"]} ${styles["init"]}`;
            }
            if (url.active)
              classes = `${styles["card__img"]} ${styles["active"]}`;
            if (url.fadeOut)
              classes = `${styles["card__img"]} ${styles["fade-out"]}`;
            return (
              <img key={`reg_img${i}`} className={classes} src={url.url}></img>
            );
          })}
        </div>
    )
}

export default RegisterImageCarousel;