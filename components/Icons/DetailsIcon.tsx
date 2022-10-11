import React from "react";

const DetailsIcon: React.FC<{className: string}> = (props) => {
  return (
    <svg
      viewBox="0 0 36 36"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      className={props.className}
    >
      <path
        d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Zm0,22H4V8H32Z"
      ></path>
      <path
        d="M9,14H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
      ></path>
      <path
        d="M9,18H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
      ></path>
      <path
        d="M9,22H19a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
      ></path>
      <rect x="0" y="0"/>
    </svg>
  );
};


export default DetailsIcon;