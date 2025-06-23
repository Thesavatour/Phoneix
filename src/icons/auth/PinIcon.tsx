const PinIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C12 22 5 15.75 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10C19 15.75 12 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black dark:text-white"
    />
    <circle
      cx="12"
      cy="10"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      className="text-black dark:text-white"
    />
  </svg>
);

export default PinIcon;
