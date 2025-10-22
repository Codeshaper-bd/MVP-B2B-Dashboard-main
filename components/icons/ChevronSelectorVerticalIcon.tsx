import React from "react";

function ChevronSelectorVerticalIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.833984 10L5.00065 14.1667L9.16732 10M0.833984 5.00004L5.00065 0.833374L9.16732 5.00004"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ChevronSelectorVerticalIcon;
