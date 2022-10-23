import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import UploadIcon from "../../Icons/UploadIcon";
import styles from "./styles/Settings.module.scss";
import StyledButton from "../../UI/StyledButton";
import AvatarCropModal from "./AvatarCropModal";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { cropModalActions } from "../../../redux/store";

const AvatarSetting: React.FC<{ headerText: string }> = (props) => {
  const dispatch = useDispatch();
  const [fileURL, setFileURL] = useState<null | string>(null);

  const allowedFormats = /image\/(png|jpg|jpeg)/i;

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = e.target.files![0];
    if (file !== null) {
      if (!file.type.match(allowedFormats)) {
        alert("[ERROR] File must be of png, jpg or jpeg format!");
        return;
      }
      setFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (fileURL) {
      dispatch(cropModalActions.showModal({ imgSrc: fileURL }));
    }
  }, [fileURL]);

  return (
    <Fragment>
      <section className={styles["setting"]}>
        <h2 className={styles["setting__name"]}>{props.headerText}</h2>
        <div className={styles["avatar-img"]}>
          <Image
            width={500}
            height={500}
            src={fileURL || "/avatar.png"}
          ></Image>
        </div>
        <StyledButton addClass={styles["file-input__btn"]}>
          <Fragment>
            <label
              className={styles["file-input__dummy"]}
              htmlFor={"file-input"}
            >
              Upload file
            </label>
            <input
              id="file-input"
              type="file"
              className={styles["file-input"]}
              accept=".jpeg, .png, .jpg"
              multiple={false}
              onChange={fileChangeHandler}
            ></input>
            <UploadIcon className={styles["file-input__upload-icon"]} />
          </Fragment>
        </StyledButton>
      </section>
    </Fragment>
  );
};

export default AvatarSetting;
