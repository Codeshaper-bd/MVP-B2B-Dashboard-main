import React, { forwardRef } from "react";

const InfoIcon = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ ...props }, ref) => (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M7.99998 10.6654V7.9987M7.99998 5.33203H8.00665M14.6666 7.9987C14.6666 11.6806 11.6819 14.6654 7.99998 14.6654C4.31808 14.6654 1.33331 11.6806 1.33331 7.9987C1.33331 4.3168 4.31808 1.33203 7.99998 1.33203C11.6819 1.33203 14.6666 4.3168 14.6666 7.9987Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
);

InfoIcon.displayName = "InfoIcon";

export default InfoIcon;
