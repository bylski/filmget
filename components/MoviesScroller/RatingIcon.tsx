import React from "react";
import styles from "./styles/MovieCard.module.scss"

const RatingIcon: React.FC<{className?: string}> = (props) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 280.124 280.124"
      className={props.className}
    >
      <path
        style={{ fill: "#f4b459" }}
        d="M280.124,106.914l-92.059-6.598L140.057,4.441l-48.55,95.874L0,106.914l61.282,74.015
		l-17.519,94.754l96.294-43.614l96.294,43.606l-17.799-94.754C218.553,180.919,280.124,106.914,280.124,106.914z"
      />
      <polygon
        style={{ fill: "#e3a753" }}
        points="236.352,275.683 218.553,180.92 280.071,106.975 280.071,106.905 188.065,100.315 
		140.057,4.441 140.057,232.068 	"
      />
    </svg>
  );
};

export default RatingIcon;
