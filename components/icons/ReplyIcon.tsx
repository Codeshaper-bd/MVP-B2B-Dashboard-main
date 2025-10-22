import React from "react";

function ReplyIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.50065 9.66536L1.33398 5.4987M1.33398 5.4987L5.50065 1.33203M1.33398 5.4987H6.66732C9.46758 5.4987 10.8677 5.4987 11.9373 6.04367C12.8781 6.52303 13.643 7.28794 14.1223 8.22875C14.6673 9.2983 14.6673 10.6984 14.6673 13.4987V14.6654"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ReplyIcon;
