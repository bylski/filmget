import React from "react";

const FiltersIcon: React.FC<{
  className?: string;
  trackClasses?: { track1Class?: string, track2Class?: string, track3Class?: string};
}> = (props) => {
  return (
    <svg
      width="35px"
      height="35px"
      viewBox="0 0 35 35"
      data-name="Layer 2"
      id="Layer_2"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M5.42,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,0,1,2.5,0V33.19A1.25,1.25,0,0,1,5.42,34.44Z" />
      <path
        className={props.trackClasses?.track1Class}
        d="M9.34,27.41H1.5a1.25,1.25,0,0,1,0-2.5H9.34a1.25,1.25,0,0,1,0,2.5Z"
      />
      <path d="M29.58,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,1,1,2.5,0V33.19A1.25,1.25,0,0,1,29.58,34.44Z" />
      <path
        className={props.trackClasses?.track3Class}
        d="M33.5,27.41H25.66a1.25,1.25,0,0,1,0-2.5H33.5a1.25,1.25,0,0,1,0,2.5Z"
      />
      <path d="M17.5,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,1,1,2.5,0V33.19A1.25,1.25,0,0,1,17.5,34.44Z" />
      <path
        className={props.trackClasses?.track2Class}
        d="M21.42,10.09H13.58a1.25,1.25,0,0,1,0-2.5h7.84a1.25,1.25,0,0,1,0,2.5Z"
      />
    </svg>
  );
};

export default FiltersIcon;
