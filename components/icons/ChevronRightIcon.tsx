import React from "react";

function ChevronRightIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.20425 4.99956L5.91675 8.71206L4.85625 9.77256L0.083252 4.99956L4.85625 0.226562L5.91675 1.28706L2.20425 4.99956Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ChevronRightIcon;
