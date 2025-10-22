import React from "react";

function UpScaleIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_30_6)">
        <path
          d="M4.33333 14.6667V1.33331M4.33333 1.33331L1 4.66665M4.33333 1.33331L7.66667 4.66665M12.6667 14.6667V5.49998M12.6667 5.49998L9.33333 8.83331M12.6667 5.49998L16 8.83331"
          stroke="#CECFD2"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_30_6">
          <rect width="17" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default UpScaleIcon;
