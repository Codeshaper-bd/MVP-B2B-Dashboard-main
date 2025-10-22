import React from "react";

function ChevronLeftIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.79575 4.99956L0.083252 1.28706L1.14375 0.226562L5.91675 4.99956L1.14375 9.77256L0.083252 8.71206L3.79575 4.99956Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ChevronLeftIcon;
