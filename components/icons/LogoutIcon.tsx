import React from "react";

function LogoutIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.9993 5.16667L18.3327 8.5M18.3327 8.5L14.9993 11.8333M18.3327 8.5H7.49935M12.4993 2.00337C11.4371 1.36523 10.2037 1 8.88824 1C4.89951 1 1.66602 4.35786 1.66602 8.5C1.66602 12.6421 4.89951 16 8.88824 16C10.2037 16 11.4371 15.6348 12.4993 14.9966"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LogoutIcon;
