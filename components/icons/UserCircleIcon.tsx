function UserCircleIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.20238 22.6768C6.9121 21.0048 8.56912 19.832 10.5 19.832H17.5C19.431 19.832 21.088 21.0048 21.7977 22.6768M18.6667 11.082C18.6667 13.6594 16.5774 15.7487 14 15.7487C11.4227 15.7487 9.33337 13.6594 9.33337 11.082C9.33337 8.5047 11.4227 6.41536 14 6.41536C16.5774 6.41536 18.6667 8.5047 18.6667 11.082ZM25.6667 13.9987C25.6667 20.442 20.4434 25.6654 14 25.6654C7.55672 25.6654 2.33337 20.442 2.33337 13.9987C2.33337 7.55538 7.55672 2.33203 14 2.33203C20.4434 2.33203 25.6667 7.55538 25.6667 13.9987Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default UserCircleIcon;
