import React from "react";

function SendIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.539 21.8274C15.155 22.6304 13.9922 22.5693 13.6945 21.7305L9.79948 10.7558L1.71633 2.70868C1.0842 2.07937 1.52987 1 2.42185 1H23.9133C24.649 1 25.1328 1.76772 24.8154 2.43146L15.539 21.8274Z"
        stroke="currentColor"
        strokeWidth="2"
        stroke-miterlimit="10"
      />
      <path
        d="M10 11L24.5 2"
        stroke="currentColor"
        strokeWidth="2"
        stroke-miterlimit="10"
      />
    </svg>
  );
}

export default SendIcon;
