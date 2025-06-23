interface Props {
  className?: string;
}

function StackInvestmentIcon({ className }: Props) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 7.42036H1.063C1.4 10.3234 3.317 12.0004 6.34 12.0004C6.962 12.0004 7.507 11.9324 7.999 11.8154V10.5154C7.515 10.6344 6.954 10.6854 6.34 10.6854C4.24 10.6854 2.885 9.48736 2.565 7.42136H6.582V6.49336H2.497V5.55736C2.49567 5.44736 2.49833 5.3377 2.505 5.22836H6.583V4.30136H2.618C3.006 2.40336 4.337 1.31636 6.341 1.31636C6.955 1.31636 7.516 1.36636 8 1.49336V0.194362C7.45745 0.059698 6.89998 -0.00549061 6.341 0.000361691C3.413 0.000361691 1.521 1.56936 1.097 4.30036H0V5.22836H1.01V6.49336H0V7.42036Z"
        fill="white"
      />
    </svg>
  );
}

export default StackInvestmentIcon;
