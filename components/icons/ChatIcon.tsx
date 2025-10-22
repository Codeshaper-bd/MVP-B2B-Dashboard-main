import React from "react";

function ChatIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.7356 19.9991C24.1544 18.0293 25 15.6168 25 13C25 6.37559 19.6257 1 12.9972 1C6.36864 1 1 6.37559 1 13C1 19.6244 6.37432 25 12.9972 25C15.0515 25 16.9811 24.4834 18.6723 23.5752L22.1921 24.5582C22.9138 24.7597 23.5925 24.1253 23.4402 23.3917L22.7356 19.9991Z"
        stroke="currentColor"
        strokeWidth="2"
        stroke-miterlimit="10"
      />
    </svg>
  );
}

export default ChatIcon;
