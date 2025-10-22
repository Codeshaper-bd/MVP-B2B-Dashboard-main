function ClockIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_3313_119037)">
        <path
          d="M9.99935 5.0013V10.0013L13.3327 11.668M18.3327 10.0013C18.3327 14.6037 14.6017 18.3346 9.99935 18.3346C5.39698 18.3346 1.66602 14.6037 1.66602 10.0013C1.66602 5.39893 5.39698 1.66797 9.99935 1.66797C14.6017 1.66797 18.3327 5.39893 18.3327 10.0013Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3313_119037">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ClockIcon;
