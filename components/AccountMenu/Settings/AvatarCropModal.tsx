import React, { SyntheticEvent, useEffect, useState, Fragment } from "react";
import styles from "./styles/AvatarCropModal.module.scss";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  PercentCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import StyledButton from "../../UI/StyledButton";
import axios from "axios";
import ScissorsIcon from "../../Icons/ScissorsIcon";
import EyeIcon from "../../Icons/EyeIcon";
import { useDispatch } from "react-redux";
import { cropModalActions } from "../../../redux/store";

const AvatarCropModal: React.FC<{ imgSrc: string }> = (props) => {
  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState<null | HTMLImageElement>(null);
  const [imgIsLoaded, setImgIsLoaded] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  function imageLoadHandler(e: SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    setImage(img);
    setImgIsLoaded(true);
  }

  useEffect(() => {
    if (image !== null) {
      const { naturalWidth: width, naturalHeight: height } = image;

      const crop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 100,
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
  }, [imgIsLoaded]);

  const confirmCropHandler = () => {
    if (image !== null && crop !== undefined && !isDisabled) {
      const canvas = document.createElement("canvas");
      // image.setAttribute("crossorigin", "anonymous");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
      if (ctx !== null && ctx !== undefined) {
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      }

      const base64Image = canvas.toDataURL("image/jpeg");
      axios.post("/api/change-avatar", { image: base64Image });
    }
  };

  const onCompleteHandler = (crop: PixelCrop, percentageCrop: PercentCrop) => {
    setCrop(crop);
    if (crop!.width === 0 || crop!.height === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const dispatch = useDispatch();
  const cancelBtnHandler = () => {
    dispatch(cropModalActions.hideModal())
    // console.log(Date())
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
          onComplete={onCompleteHandler}
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
        <StyledButton
          action={confirmCropHandler}
          addClass={
            !isDisabled
              ? styles["footer__btn"]
              : `${styles["footer__btn"]} ${styles["btn__disabled"]} `
          }
        >
          <Fragment>
            <p>Crop Image</p>
            <ScissorsIcon className={styles["scissors-icon"]} />
          </Fragment>
        </StyledButton>
        <StyledButton action={cancelBtnHandler} addClass={styles["footer__btn"]}>Cancel Crop</StyledButton>
      </footer>
    </div>
  );
};

export default AvatarCropModal;
