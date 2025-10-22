import React from "react";

function GlobeIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.99996 1.66797C12.0844 3.94993 13.2689 6.91133 13.3333 10.0013C13.2689 13.0913 12.0844 16.0527 9.99996 18.3346M9.99996 1.66797C7.91556 3.94993 6.731 6.91133 6.66663 10.0013C6.731 13.0913 7.91556 16.0527 9.99996 18.3346M9.99996 1.66797C5.39759 1.66797 1.66663 5.39893 1.66663 10.0013C1.66663 14.6037 5.39759 18.3346 9.99996 18.3346M9.99996 1.66797C14.6023 1.66797 18.3333 5.39893 18.3333 10.0013C18.3333 14.6037 14.6023 18.3346 9.99996 18.3346M2.08331 7.5013H17.9166M2.08329 12.5013H17.9166"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default GlobeIcon;
