import React from "react";

function PencilIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.39668 15.0953C1.43497 14.7507 1.45411 14.5784 1.50624 14.4174C1.55249 14.2745 1.61784 14.1386 1.70051 14.0132C1.79369 13.8719 1.91627 13.7493 2.16142 13.5042L13.1667 2.49895C14.0871 1.57847 15.5795 1.57848 16.5 2.49895C17.4205 3.41942 17.4205 4.91181 16.5 5.83228L5.49475 16.8375C5.2496 17.0827 5.12702 17.2052 4.98572 17.2984C4.86035 17.3811 4.72439 17.4464 4.58152 17.4927C4.42048 17.5448 4.24819 17.564 3.90362 17.6023L1.08331 17.9156L1.39668 15.0953Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PencilIcon;
