import React, { useState, useEffect} from "react";
import baseStyles from "./styles/ToWatchButton.module.scss"
import EyeIcon from "../../Icons/EyeIcon";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/reduxHooks";
import { movieInterface, seriesInterface } from "../../../utils/types";
import axios from "axios";
import { accountActions } from "../../../redux/store";

const ToWatchButton: React.FC<{
  customStyles?: {
    readonly [key: string]: string;
  };
  mediaData: movieInterface | seriesInterface
}> = (props) => {

    const session = useSession();
    const dispatch = useAppDispatch();
    const [wantToWatch, setWantToWatch] = useState(false);
    const [wantToWatchClasses, setWantToWatchClasses] = useState("");
    const [wantToWatchTitle, setWantToWatchTitle] = useState(
      'Add to "Want to watch"'
    );
    
    // If there are custom styles --> use them instead of base ones
    const styles = props.customStyles || baseStyles;
    

    const wantToWatchClickHandler = async () => {
      setWantToWatch((prev) => !prev);
  
      const baseConditions =
        (session.status === "authenticated" && "title" in props.mediaData) ||
        "name" in props.mediaData;
  
      if (baseConditions && !wantToWatch) {
        dispatch(accountActions.addToWatch(props.mediaData));
        await axios.post("/api/add-to-watch", {
          username: session.data?.user?.name,
          media: props.mediaData,
        });
      } else if (baseConditions && wantToWatch) {
        dispatch(accountActions.deleteToWatch(props.mediaData));
        await axios.post("/api/remove-to-watch", {
          username: session.data?.user?.name,
          media: props.mediaData,
        });
      }
    };
  
    // GET REDUX STORED DATA
    const mediaToWatchIds = useAppSelector(
      (state) => state.account.toWatch.mediaIds
    );
  
  
    // Check if media is already added to "want to watch"
    useEffect(() => {
      if (session.status === "authenticated") {
        let isWantToWatch = false;
        for (let mediaId of mediaToWatchIds) {
          if (mediaId === props.mediaData.id) {
            isWantToWatch = true;
          }
        }
  
        if (isWantToWatch) {
          setWantToWatch(true);
        } else {
          setWantToWatch(false);
        }
      }
    }, [session.status]);
  
    useEffect(() => {
      if (wantToWatch) {
        setWantToWatchTitle('Remove from "Want to watch"');
        setWantToWatchClasses(styles["active"]);
      } else {
        setWantToWatchClasses(styles["unactive"]);
        setWantToWatchTitle('Add to "Want to watch"');
      }
    }, [wantToWatch]);
  


  return (
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
  );
};

export default ToWatchButton;
