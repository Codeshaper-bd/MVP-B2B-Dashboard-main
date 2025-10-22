import React from "react";

function InfoRingsIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.3">
        <path
          d="M17.9998 30.5C11.0963 30.5 5.49984 24.9035 5.49984 18C5.49984 11.0964 11.0963 5.49999 17.9998 5.49999C24.9034 5.49999 30.4998 11.0964 30.4998 18C30.4998 24.9035 24.9034 30.5 17.9998 30.5Z"
          stroke="#DC6803"
          strokeWidth="1.66667"
        />
      </g>
      <g opacity="0.1">
        <path
          d="M18 34.6667C8.79525 34.6667 1.33333 27.2047 1.33333 18C1.33333 8.79525 8.79525 1.33333 18 1.33333C27.2047 1.33333 34.6667 8.79525 34.6667 18C34.6667 27.2047 27.2047 34.6667 18 34.6667Z"
          stroke="#DC6803"
          strokeWidth="1.66667"
        />
      </g>
      <g clip-path="url(#clip0_59_1981)">
        <path
          d="M17.9998 14.6667V18M17.9998 21.3333H18.0082M26.3332 18C26.3332 22.6024 22.6022 26.3333 17.9998 26.3333C13.3975 26.3333 9.6665 22.6024 9.6665 18C9.6665 13.3976 13.3975 9.66666 17.9998 9.66666C22.6022 9.66666 26.3332 13.3976 26.3332 18Z"
          stroke="#DC6803"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_59_1981">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(8 8)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default InfoRingsIcon;
