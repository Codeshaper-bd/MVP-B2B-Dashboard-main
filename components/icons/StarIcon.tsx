import React from "react";

function StarIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 16.6341L4.65227 20.1873L6.06977 13.0521L0.728271 8.11295L7.95257 7.25615L11 0.650146L14.0474 7.25615L21.2717 8.11295L15.9302 13.0521L17.3477 20.1873L11 16.6341ZM11 14.5713L14.8223 16.7106L13.9682 12.4149L17.1839 9.44045L12.8342 8.92475L11 4.94765L9.16577 8.92565L4.81607 9.44045L8.03177 12.4149L7.17767 16.7106L11 14.5713Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default StarIcon;
