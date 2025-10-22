import React from "react";

function ThumbsUpIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1879_98680)">
        <path
          d="M4.08317 12.8334V6.41675M1.1665 7.58341V11.6667C1.1665 12.3111 1.68884 12.8334 2.33317 12.8334H10.1651C11.0289 12.8334 11.7635 12.2032 11.8948 11.3495L12.523 7.26618C12.6861 6.2061 11.8659 5.25008 10.7934 5.25008H8.74984C8.42767 5.25008 8.1665 4.98891 8.1665 4.66675V2.60515C8.1665 1.81074 7.52251 1.16675 6.7281 1.16675C6.53862 1.16675 6.36691 1.27834 6.28995 1.45149L4.23713 6.07033C4.14351 6.28099 3.9346 6.41675 3.70408 6.41675H2.33317C1.68884 6.41675 1.1665 6.93908 1.1665 7.58341Z"
          stroke="currentColor"
          stroke-width="1.33"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1879_98680">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ThumbsUpIcon;
