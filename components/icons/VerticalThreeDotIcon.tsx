import React from "react";

function VerticalThreeDotIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.99996 10.8359C10.4602 10.8359 10.8333 10.4628 10.8333 10.0026C10.8333 9.54237 10.4602 9.16927 9.99996 9.16927C9.53972 9.16927 9.16663 9.54237 9.16663 10.0026C9.16663 10.4628 9.53972 10.8359 9.99996 10.8359Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.99996 5.0026C10.4602 5.0026 10.8333 4.62951 10.8333 4.16927C10.8333 3.70903 10.4602 3.33594 9.99996 3.33594C9.53972 3.33594 9.16663 3.70903 9.16663 4.16927C9.16663 4.62951 9.53972 5.0026 9.99996 5.0026Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.99996 16.6693C10.4602 16.6693 10.8333 16.2962 10.8333 15.8359C10.8333 15.3757 10.4602 15.0026 9.99996 15.0026C9.53972 15.0026 9.16663 15.3757 9.16663 15.8359C9.16663 16.2962 9.53972 16.6693 9.99996 16.6693Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default VerticalThreeDotIcon;
