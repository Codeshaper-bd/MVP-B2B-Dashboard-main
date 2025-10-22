function TwitterIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_10671_265975)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.6455 14.653L7.16268 9.68871L2.8026 14.653H0.958008L6.34431 8.52199L0.958008 0.845703H5.69388L8.97642 5.5245L13.0893 0.845703H14.9339L9.79753 6.69277L15.3814 14.653H10.6455ZM12.6997 13.2534H11.4578L3.59918 2.24526H4.84121L7.98865 6.65302L8.53293 7.41789L12.6997 13.2534Z"
          fill="#85888E"
        />
      </g>
      <defs>
        <clipPath id="clip0_10671_265975">
          <rect
            width="15.0625"
            height="15.0625"
            fill="white"
            transform="translate(0.637695 0.21875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default TwitterIcon;
