interface TradesIconProps {
  className?: string;
}

function TradesIcon({ className }: TradesIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.58691 12.0997V10.7197"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="stroke-current"
      />
      <path
        d="M8 12.0998V9.33984"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="stroke-current"
      />
      <path
        d="M11.4131 12.0998V7.95312"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="stroke-current"
      />
      <path
        d="M11.4136 3.90039L11.1069 4.26039C9.40691 6.24706 7.12691 7.65372 4.58691 8.28706"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="stroke-current"
      />
      <path
        d="M9.45996 3.90039H11.4133V5.84706"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
      <path
        d="M5.99967 14.6663H9.99967C13.333 14.6663 14.6663 13.333 14.6663 9.99967V5.99967C14.6663 2.66634 13.333 1.33301 9.99967 1.33301H5.99967C2.66634 1.33301 1.33301 2.66634 1.33301 5.99967V9.99967C1.33301 13.333 2.66634 14.6663 5.99967 14.6663Z"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      />
    </svg>
  );
}

export default TradesIcon;
