import React from "react";

function SignalTransmitIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5356 3.79789C15.4882 5.75051 15.4882 8.91634 13.5356 10.869M6.46449 10.869C4.51187 8.91634 4.51187 5.75051 6.46449 3.79789M4.10728 13.226C0.852912 9.97166 0.852912 4.69529 4.10728 1.44092M15.8928 1.44092C19.1471 4.69529 19.1471 9.97166 15.8928 13.226M10 9.00012C10.9205 9.00012 11.6667 8.25393 11.6667 7.33346C11.6667 6.41298 10.9205 5.66679 10 5.66679C9.07955 5.66679 8.33335 6.41298 8.33335 7.33346C8.33335 8.25393 9.07955 9.00012 10 9.00012ZM10 9.00012V16.5001"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SignalTransmitIcon;
