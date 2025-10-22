function EmailColoredIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_10671_263765)">
        <path
          d="M2.85742 2.85742H13.1431V13.1431H2.85742V2.85742Z"
          fill="#ECEFF1"
        />
        <path
          d="M8.00098 9.08206L13.1438 13.1432V5.12549L8.00098 9.08206Z"
          fill="#CFD8DC"
        />
        <path
          d="M13.5721 2.85742H13.1436L8.0007 6.91856L2.85784 2.85742H2.42927C1.71955 2.85742 1.14355 3.43342 1.14355 4.14314V11.8574C1.14355 12.5671 1.71955 13.1431 2.42927 13.1431H2.85784V5.12542L8.0007 9.08114L13.1436 5.12456V13.1431H13.5721C14.2818 13.1431 14.8578 12.5671 14.8578 11.8574V4.14314C14.8578 3.43342 14.2818 2.85742 13.5721 2.85742Z"
          fill="#F44336"
        />
      </g>
      <defs>
        <clipPath id="clip0_10671_263765">
          <rect
            width="13.7143"
            height="13.7143"
            fill="white"
            transform="translate(1.14258 1.14307)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default EmailColoredIcon;
