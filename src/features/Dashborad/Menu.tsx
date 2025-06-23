'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import MenuCardLayout from './components/MenuCardLayout';
import InvestNowButton from '../Investments/components/InvestNowButton';
import MenuInfoCard from './components/MenuInfoCard';
import useGlobalSettings from '@/hooks/useGlobalSettings';

interface Props {
  data: CapitalGrowth;
}

const tabs: {
  label: string;
  value: MenuTabKeys;
}[] = [
  { label: 'Investment', value: 'investment' },
  { label: 'Trading', value: 'trading' },
  { label: 'Commissions', value: 'commissions' },
  { label: 'Wallets', value: 'wallets' },
];

function Menu({ data }: Props) {
  const MenuInfo: Record<
    MenuTabKeys,
    { title: string; value: string | number }[]
  > = {
    investment: [
      { title: 'Total Investment', value: data.investment.total_invest },
      { title: 'Total Profit', value: data.investment.total_profit },
      { title: 'Running Investment', value: data.investment.running_invest },
    ],
    trading: [
      { title: 'Total Trade', value: data.trade.total_trade },
      { title: 'Winning Trade', value: data.trade.wining_trade },
      { title: 'Loss Amount', value: data.trade.loss_amount },
    ],
    commissions: [
      { title: 'Referral Commission', value: data.commission.referral },
      { title: 'Level Commission', value: data.commission.level },
      { title: 'Deposit Commission', value: data.commission.deposit },
    ],
    wallets: [
      { title: 'Primary Balance', value: data.wallet.primary_balance },
      { title: 'Investment Balance', value: data.wallet.investment_balance },
      { title: 'Trade Balance', value: data.wallet.trade_balance },
    ],
  };

  const buttonLink = {
    investment: {
      href: '/investments',
      label: 'Invest Now',
    },
    trading: {
      href: '/trades',
      label: 'Trade Now',
    },
    commissions: {
      href: '/deposit?tab=1',
      label: 'Commissions',
    },
    wallets: {
      href: '/top-up',
      label: 'View Wallets',
    },
  };

  const [activeTabValue, setActiveTabValue] =
    useState<MenuTabKeys>('investment');

  const handleTabChange = (value: MenuTabKeys) => {
    setActiveTabValue(value);
  };
  const {
    data: globalSettings,
    isLoading: isGlobalSettingsLoading,
    isSuccess: isSuccessGlobalSettings,
  } = useGlobalSettings();
  return (
    <MenuCardLayout
      tabs={tabs}
      activeTabValue={activeTabValue}
      onChange={handleTabChange}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeTabValue}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          <div className="flex items-center gap-3 w-full flex-wrap">
            <Link href={buttonLink[activeTabValue].href}>
              <InvestNowButton btnText={buttonLink[activeTabValue].label} />
            </Link>
            {MenuInfo[activeTabValue].map((info, index) => {
              return (
                <MenuInfoCard
                  key={index}
                  title={info.title}
                  amount={info.value}
                  currency={globalSettings?.currency_symbol as string}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </MenuCardLayout>
  );
}

export default Menu;
