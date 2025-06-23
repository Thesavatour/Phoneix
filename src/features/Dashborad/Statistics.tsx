'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import CardStack from '@/components/CardStack';
import { cn } from '@/utilits';

interface StatisticsProps {
  data: CashFlowStatistics;
}

function Statistics({ data }: StatisticsProps) {
  const [active, setActive] = useState<'deposit' | 'withdraw'>('deposit');

  const tabsData = {
    deposit: [
      {
        id: 1,
        color: '#DFFF45',
        title: 'Total Amount',
        amount: data.deposit.total,
        percentage: 100,
      },
      {
        id: 2,
        color: '#5568FF',
        title: 'Primary Amount',
        amount: data.deposit.primary.amount,
        percentage: data.deposit.primary.percentage,
      },
      {
        id: 3,
        color: '#AE76FF',
        title: 'Investment Amount',
        amount: data.deposit.investment.amount,
        percentage: data.deposit.investment.percentage,
      },
      {
        id: 4,
        color: '#FF8F3D',
        title: 'Trade Amount',
        amount: data.deposit.trade.amount,
        percentage: data.deposit.trade.percentage,
      },
    ],
    withdraw: [
      {
        id: 1,
        color: '#DFFF45',
        title: 'Total Amount',
        amount: data.withdraw.total,
        percentage: null,
      },
      {
        id: 2,
        color: '#5568FF',
        title: 'Pending Amount',
        amount: data.withdraw.pending,
        percentage: null,
      },
      {
        id: 3,
        color: '#AE76FF',
        title: 'Rejected Amount',
        amount: data.withdraw.rejected,
        percentage: null,
      },
      {
        id: 4,
        color: '#FF8F3D',
        title: 'Charge Amount',
        amount: data.withdraw.charge,
        percentage: null,
      },
    ],
  };

  return (
    <div className="dark:bg-[#222222] bg-white border dark:border-[#313131] border-[#E4E4E2] text-white p-5 rounded-[30px] flex-grow relative max-h-[346px]">
      <ButtonGroup active={active} setActive={setActive} />
      <div className="mt-[152px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.68, -0.55, 0.27, 1.55] }}
          >
            <CardStack data={tabsData[active]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Statistics;

interface ButtonGroupProps {
  active: 'deposit' | 'withdraw';
  setActive: React.Dispatch<React.SetStateAction<'deposit' | 'withdraw'>>;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ active, setActive }) => {
  const handleButtonClick = (type: 'deposit' | 'withdraw') => {
    setActive(type);
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        className={cn(
          'px-[13px] py-[5.5px] text-black dark:text-white text-sm leading-[21px] rounded-[9px] inline cursor-pointer',
          {
            'bg-[#3B3B3B] text-white': active === 'deposit',
            'bg-transparent': active !== 'deposit',
          }
        )}
        onClick={() => handleButtonClick('deposit')}
        initial={{ opacity: 0.5 }}
        animate={{
          opacity: active === 'deposit' ? 1 : 0.5,
          transition: { duration: 0.5, ease: [0.1, -0.55, 0.27, 1.55] },
        }}
      >
        Deposit Statistics
      </motion.button>

      <motion.button
        className={cn(
          'px-[13px] py-[5.5px] dark:text-white text-black text-sm leading-[21px] rounded-[9px] inline cursor-pointer',
          {
            'bg-[#3B3B3B] text-white': active === 'withdraw',
            'bg-transparent': active !== 'withdraw',
          }
        )}
        onClick={() => handleButtonClick('withdraw')}
        initial={{ opacity: 0.5 }}
        animate={{
          opacity: active === 'withdraw' ? 1 : 0.5,
          transition: { duration: 0.3, ease: [0.68, -0.55, 0.27, 1.55] },
        }}
      >
        Withdraw Statistics
      </motion.button>
    </div>
  );
};
