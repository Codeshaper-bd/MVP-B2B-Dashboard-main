import React from "react";

function DollarRoundedIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.08366 12.2225C7.08366 13.2964 7.95422 14.167 9.0281 14.167H10.8337C11.9843 14.167 12.917 13.2343 12.917 12.0837C12.917 10.9331 11.9843 10.0003 10.8337 10.0003H9.16699C8.0164 10.0003 7.08366 9.06759 7.08366 7.91699C7.08366 6.7664 8.0164 5.83366 9.16699 5.83366H10.9725C12.0464 5.83366 12.917 6.70422 12.917 7.7781M10.0003 4.58366V5.83366M10.0003 14.167V15.417M18.3337 10.0003C18.3337 14.6027 14.6027 18.3337 10.0003 18.3337C5.39795 18.3337 1.66699 14.6027 1.66699 10.0003C1.66699 5.39795 5.39795 1.66699 10.0003 1.66699C14.6027 1.66699 18.3337 5.39795 18.3337 10.0003Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DollarRoundedIcon;
