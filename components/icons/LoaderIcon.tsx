function LoaderIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_20281_154258)">
        <path
          d="M7.99967 1.33594V4.0026M7.99967 12.0026V14.6693M3.99967 8.0026H1.33301M14.6663 8.0026H11.9997M12.7186 12.7216L10.833 10.8359M12.7186 3.3359L10.833 5.22152M3.28072 12.7216L5.16634 10.8359M3.28072 3.3359L5.16634 5.22152"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_20281_154258">
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LoaderIcon;
