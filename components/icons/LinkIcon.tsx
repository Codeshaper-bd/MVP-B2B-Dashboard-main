function LinkIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.5897 15.3024L9.41116 16.4809C7.78398 18.1081 5.14579 18.1081 3.51861 16.4809C1.89142 14.8537 1.89142 12.2155 3.51861 10.5883L4.69712 9.40982M15.3037 10.5883L16.4822 9.40982C18.1094 7.78264 18.1094 5.14445 16.4822 3.51726C14.855 1.89008 12.2169 1.89008 10.5897 3.51726L9.41116 4.69577M7.08375 12.9157L12.9171 7.08239"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LinkIcon;
