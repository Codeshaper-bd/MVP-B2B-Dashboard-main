import React from "react";

function LiveStreamingIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 14C13.6046 14 14.5 13.1046 14.5 12C14.5 10.8954 13.6046 10 12.5 10C11.3954 10 10.5 10.8954 10.5 12C10.5 13.1046 11.3954 14 12.5 14Z"
        stroke="#CECFD2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 8C7 9 6.5 10.5 6.5 12C6.5 13.5 7 15 8 16"
        stroke="#CECFD2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 6C3.5 7.5 2.5 9.5 2.5 12C2.5 14.5 3.5 16.5 5 18"
        stroke="#CECFD2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 16C18 15 18.5 13.5 18.5 12C18.5 10.5 18 9 17 8"
        stroke="#CECFD2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 18C21.5 16.5 22.5 14.5 22.5 12C22.5 9.5 21.5 7.5 20 6"
        stroke="#CECFD2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default LiveStreamingIcon;
