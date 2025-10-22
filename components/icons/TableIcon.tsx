import React from "react";

function TableIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 12L22.5 12M12 1.5L12 22.5M7.1 1.5H16.9C18.8602 1.5 19.8403 1.5 20.589 1.88148C21.2475 2.21703 21.783 2.75247 22.1185 3.41103C22.5 4.15972 22.5 5.13982 22.5 7.1V16.9C22.5 18.8602 22.5 19.8403 22.1185 20.589C21.783 21.2475 21.2475 21.783 20.589 22.1185C19.8403 22.5 18.8602 22.5 16.9 22.5H7.1C5.13982 22.5 4.15972 22.5 3.41103 22.1185C2.75247 21.783 2.21703 21.2475 1.88148 20.589C1.5 19.8403 1.5 18.8602 1.5 16.9V7.1C1.5 5.13982 1.5 4.15972 1.88148 3.41103C2.21703 2.75247 2.75247 2.21703 3.41103 1.88148C4.15972 1.5 5.13982 1.5 7.1 1.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TableIcon;
