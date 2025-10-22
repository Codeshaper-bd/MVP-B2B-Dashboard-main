import React from "react";

function SpamIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_5995_14558)">
        <path
          d="M8.00004 5.33203V7.9987M8.00004 10.6654H8.00671M14.6667 7.9987C14.6667 11.6806 11.6819 14.6654 8.00004 14.6654C4.31814 14.6654 1.33337 11.6806 1.33337 7.9987C1.33337 4.3168 4.31814 1.33203 8.00004 1.33203C11.6819 1.33203 14.6667 4.3168 14.6667 7.9987Z"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5995_14558">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SpamIcon;
