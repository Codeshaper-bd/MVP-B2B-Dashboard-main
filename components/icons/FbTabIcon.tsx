function FbTabIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_10671_265976)">
        <path
          d="M15.8125 7.75C15.8125 3.5906 12.4406 0.21875 8.28125 0.21875C4.12185 0.21875 0.75 3.5906 0.75 7.75C0.75 11.509 3.50405 14.6248 7.10449 15.1898V9.927H5.19226V7.75H7.10449V6.09077C7.10449 4.20325 8.22888 3.16064 9.94916 3.16064C10.7729 3.16064 11.635 3.30774 11.635 3.30774V5.16113H10.6854C9.74984 5.16113 9.45801 5.74172 9.45801 6.33789V7.75H11.5468L11.2128 9.927H9.45801V15.1898C13.0584 14.6248 15.8125 11.509 15.8125 7.75Z"
          fill="#85888E"
        />
      </g>
      <defs>
        <clipPath id="clip0_10671_265976">
          <rect
            width="15.0625"
            height="15.0625"
            fill="white"
            transform="translate(0.75 0.21875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default FbTabIcon;
