import React from "react";

function VerticalSwitch({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.7668 1.33398V14.6673M12.7668 14.6673L9.43343 11.334M12.7668 14.6673L16.1001 11.334M4.43343 14.6673V1.33398M4.43343 1.33398L1.1001 4.66732M4.43343 1.33398L7.76676 4.66732"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default VerticalSwitch;
