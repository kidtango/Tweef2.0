import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const FlowIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon width="546.133" height="546.133" viewBox="0 0 512 512">
      <g transform="translate(484.608 680.539)" color="#000" fill="#0994ff">
        <circle
          // style={
          //   "isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1"
          // }
          cx="-228.608"
          cy="-424.539"
          r="256"
          overflow="visible"
        />
        <g
          stroke-width="17.758"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            // style={
            //   "isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1"
            // }
            d="M-383.414-457.99c100.71 70.65 194.863-90.517 309.619-2.293M-383.414-380.011c100.71 70.649 194.863-90.518 309.619-2.294"
            overflow="visible"
            stroke-width="40.31811836"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export default FlowIcon;
