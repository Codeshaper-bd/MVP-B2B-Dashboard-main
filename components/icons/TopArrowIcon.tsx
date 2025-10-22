import React from "react";

function TopArrowIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.00033 12.8337V1.16699M7.00033 1.16699L1.16699 7.00033M7.00033 1.16699L12.8337 7.00033"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TopArrowIcon;
