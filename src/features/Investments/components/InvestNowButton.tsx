'use client';
import { motion, useAnimation } from 'framer-motion';

interface Props {
  btnText: string;
}
function InvestNowButton({ btnText }: Props) {
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({ y: -5 });
  };

  const handleHoverEnd = () => {
    controls.start({ y: 0 });
  };

  return (
    <motion.div
      className="py-6 w-[125px] flex justify-center gap-[13px] flex-col rounded-[25px] dark:bg-white-rgba-10 bg-green dark:hover:bg-[#0000001a] dark:border-none border border-[#E4E4E2] items-center cursor-pointer select-none"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.svg
        width="41"
        height="41"
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={controls}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <circle cx="20.5" cy="20.5" r="20.5" fill="#DFFF45" />
        <path
          d="M14 29L28 15M28 15H18.6667M28 15V24.3333"
          stroke="#080808"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      <span className="select-none">{btnText}</span>
    </motion.div>
  );
}

export default InvestNowButton;
