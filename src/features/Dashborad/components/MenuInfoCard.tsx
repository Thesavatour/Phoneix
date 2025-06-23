'use client';
import { formatToOneDecimal } from '@/utilits';
import { motion, useAnimation } from 'framer-motion';

interface Props {
  title: string;
  amount: number | string;
  currency: string;
}

function MenuInfoCard({ title, amount, currency }: Props) {
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({ scale: 1.1 });
  };

  const handleHoverEnd = () => {
    controls.start({ scale: 1 });
  };

  return (
    <motion.div
      className="flex-1 dark:bg-menu-card-bg-dark bg-menu-card-bg-light bg-no-repeat bg-right h-[125px] p-4 dark:bg-white-rgba-10 backdrop-blur-[17.5px] rounded-[25px] min-w-full sm:min-w-[100px] sm:max-w-full dark:border-none border border-[#E4E4E2] bg-green cursor-pointer"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <p className="text-sm dark:text-white-rgba-90 leading-[21px] mb-[18px]">
        {title}
      </p>
      <div className="flex items-baseline gap-1">
        <motion.p
          className="text-[26px] leading-[39px] dark:text-white"
          animate={controls}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          {currency}
          {formatToOneDecimal(amount as string)}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default MenuInfoCard;
