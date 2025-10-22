import React from "react";

function FlashIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 1.5L2.09346 12.1879C1.74465 12.6064 1.57024 12.8157 1.56758 12.9925C1.56526 13.1461 1.63373 13.2923 1.75326 13.3889C1.89075 13.5 2.16318 13.5 2.70803 13.5H10L9 21.5L17.9065 10.8121C18.2554 10.3936 18.4298 10.1843 18.4324 10.0075C18.4347 9.85388 18.3663 9.7077 18.2467 9.61111C18.1093 9.5 17.8368 9.5 17.292 9.5H10L11 1.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default FlashIcon;
