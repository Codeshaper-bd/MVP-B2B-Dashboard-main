import React from "react";

function DoorIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.46436 19.1451H18.5304M17.5971 19.1451H6.39765V3.75999C6.39765 3.51997 6.49597 3.28977 6.671 3.12005C6.84603 2.95033 7.08341 2.85498 7.33094 2.85498H16.6638C16.9114 2.85498 17.1487 2.95033 17.3238 3.12005C17.4988 3.28977 17.5971 3.51997 17.5971 3.75999V19.1451Z"
        stroke="white"
        strokeWidth="1.35751"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5508 11H10.6441"
        stroke="white"
        strokeWidth="1.83264"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DoorIcon;
