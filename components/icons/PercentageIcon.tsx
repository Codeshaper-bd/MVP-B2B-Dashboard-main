import React from "react";

function PercentageIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6666 5L5.66663 19M9.66663 7C9.66663 8.10457 8.7712 9 7.66663 9C6.56206 9 5.66663 8.10457 5.66663 7C5.66663 5.89543 6.56206 5 7.66663 5C8.7712 5 9.66663 5.89543 9.66663 7ZM19.6666 17C19.6666 18.1046 18.7712 19 17.6666 19C16.5621 19 15.6666 18.1046 15.6666 17C15.6666 15.8954 16.5621 15 17.6666 15C18.7712 15 19.6666 15.8954 19.6666 17Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PercentageIcon;
