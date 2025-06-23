interface DepositIconProps {
  className?: string;
}

function DepositIcon({ className }: DepositIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.75 9H11.25M9 11.25V6.75M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
        stroke="white"
        stroke-linecap="round"
        className="stroke-current"
      />
    </svg>
  );
}

export default DepositIcon;
