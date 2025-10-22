import React from "react";

function TopRightAngleArrowIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="1.66"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TopRightAngleArrowIcon;
