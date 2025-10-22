import React from "react";

function CheckCircleWaveIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.1">
        <path
          d="M1 19C1 9.05888 9.05888 1 19 1C28.9411 1 37 9.05888 37 19C37 28.9411 28.9411 37 19 37C9.05888 37 1 28.9411 1 19Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

export default CheckCircleWaveIcon;
