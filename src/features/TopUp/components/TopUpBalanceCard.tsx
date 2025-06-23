import TransparentCard from '@/components/TransparentCard';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import React from 'react';

interface TopUpBalanceCardProps {
  title: string;
  icon: React.ReactNode;
  balance: string;
}

function TopUpBalanceCard({ title, icon, balance }: TopUpBalanceCardProps) {
  const { data: globalSettings } = useGlobalSettings();
  return (
    <TransparentCard className="rounded-2xl">
      <div className="absolute w-[100px] h-[100px] bg-primary blur-[140px] top-[-7px] left-[281px] dark:block hidden"></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {icon}
          <div className=" dark:text-white-rgba-80 text-[16px] leading-6 font-normal">
            {title}
          </div>
        </div>
        <p className="dark:text-white-rgba-80 text-[16px] leading-6 font-normal">
          {globalSettings?.currency_symbol}
          {balance}
        </p>
      </div>
    </TransparentCard>
  );
}

export default TopUpBalanceCard;
