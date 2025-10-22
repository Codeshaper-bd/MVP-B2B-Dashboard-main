import React from "react";

function UndoIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 4.49984H12.75C14.8211 4.49984 16.5 6.17877 16.5 8.24984C16.5 10.3209 14.8211 11.9998 12.75 11.9998H9M1.5 4.49984L4.83333 1.1665M1.5 4.49984L4.83333 7.83317"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default UndoIcon;
