import React from "react";

function BookMarkIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L21 1V22.7394L12.3453 14.8716C11.5825 14.1781 10.4175 14.1781 9.65465 14.8716L1 22.7394L1.67267 23.4794L1 22.7394V1Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default BookMarkIcon;
