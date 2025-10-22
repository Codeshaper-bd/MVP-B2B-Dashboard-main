import React from "react";

function DollarIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M3.5 9.33268C3.5 10.6213 4.54467 11.666 5.83333 11.666H8.16667C9.45533 11.666 10.5 10.6213 10.5 9.33268C10.5 8.04402 9.45533 6.99935 8.16667 6.99935H5.83333C4.54467 6.99935 3.5 5.95468 3.5 4.66602C3.5 3.37735 4.54467 2.33268 5.83333 2.33268H8.16667C9.45533 2.33268 10.5 3.37735 10.5 4.66602M7 1.16602V12.8327"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DollarIcon;
