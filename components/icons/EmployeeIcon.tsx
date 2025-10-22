import React from "react";

function EmployeeIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35858 21.8586L7.5874 20.0874C7.53384 20.0338 7.51513 19.9546 7.53909 19.8827L8.45442 17.1368C8.48164 17.0551 8.55807 17 8.64415 17H10.3558C10.4419 17 10.5184 17.0551 10.5456 17.1368L11.4609 19.8827C11.4849 19.9546 11.4662 20.0338 11.4126 20.0874L9.64142 21.8586C9.56332 21.9367 9.43668 21.9367 9.35858 21.8586Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 15L10 17H9L7 15H12Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default EmployeeIcon;
