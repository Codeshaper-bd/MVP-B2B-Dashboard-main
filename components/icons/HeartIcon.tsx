import React from "react";

function HeartIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 30 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.3533 24.796C14.9844 25.1014 14.4418 25.1014 14.0729 24.796C4.13631 16.5693 1 13.1763 1 8.3324C1 4.25885 4.27049 1 8.22951 1C11.5574 1 13.4508 2.92039 14.7131 4.37523C15.9754 2.92039 17.8689 1 21.1967 1C25.2131 1 28.4262 4.31704 28.4262 8.3324C28.4262 13.1763 25.2899 16.5693 15.3533 24.796Z"
        stroke="currentColor"
        strokeWidth="2"
        stroke-miterlimit="10"
      />
    </svg>
  );
}

export default HeartIcon;
