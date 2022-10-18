import React, { useState } from "react";
import styles from "./styles/AvatarCropModal.module.scss";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, PercentCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import StyledButton from "../../UI/StyledButton";

const AvatarCropModal: React.FC<{ imgSrc: string }> = (props) => {
  const [crop, setCrop] = useState<Crop>();

  function imageLoadHandler(e: any) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 80,
        },
        1,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }


  const confirmCropHandler = () => {
    console.log("HEY")
    console.log(crop)
  }



  return (
    <div className={styles["crop__modal"]}>
      <div className={styles["crop__window"]}>
        <ReactCrop
          aspect={1}
          className={styles["crop__component"]}
          crop={crop}
          onChange={(c) => setCrop(c)}
          circularCrop={true}
        >
          <div className={styles["crop__img-wrap"]}>
            <img
              onLoad={imageLoadHandler}
              className={styles["crop__img"]}
              src={props.imgSrc}
            />
          </div>
        </ReactCrop>
      </div>
      <footer className={styles["footer"]}>
        <StyledButton action={confirmCropHandler} addClass={styles["footer__btn"]}>Crop Image</StyledButton>
      </footer>
    </div>
  );
};

export default AvatarCropModal;
