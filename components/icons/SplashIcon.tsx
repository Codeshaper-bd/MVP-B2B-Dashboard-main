import React from "react";

export default function SplashIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <path
        d="M11.4991 1.66797L4.07695 10.5745C3.78628 10.9233 3.64094 11.0977 3.63872 11.245C3.63679 11.3731 3.69385 11.4949 3.79345 11.5754C3.90803 11.668 4.13505 11.668 4.5891 11.668H10.6657L9.8324 18.3346L17.2545 9.42809C17.5452 9.07928 17.6905 8.90488 17.6928 8.75758C17.6947 8.62954 17.6376 8.50772 17.538 8.42722C17.4234 8.33464 17.1964 8.33464 16.7424 8.33464H10.6657L11.4991 1.66797Z"
        stroke="#85888E"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
