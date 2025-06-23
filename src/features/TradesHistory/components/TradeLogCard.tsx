import useGlobalSettings from '@/hooks/useGlobalSettings';
import { formatToOneDecimal } from '@/utilits';
import { data } from 'framer-motion/client';
import React from 'react';

interface Props {
  title: string;
  balance: string;
}

function TradeLogCard({ title, balance }: Props) {
  const { data: globalSettings } = useGlobalSettings();
  return (
    <div className="border dark:border-[#33353D] border-[#E4E4E2] dark:bg-white-rgba-10 bg-green backdrop-blur-[17.5 px] h-[86px] rounded-2xl w-auto pt-[10px] pl-4">
      <p className="dark:text-white-rgba-90 text-sm leading-5 mb-[5px]">
        {title}
      </p>
      <div className="flex gap-1 items-baseline">
        <p className="text-[18px] leading-[27px] dark:text-white">
          {globalSettings?.currency_symbol}
          {formatToOneDecimal(balance)}
        </p>
      </div>
    </div>
  );
}

export default TradeLogCard;
