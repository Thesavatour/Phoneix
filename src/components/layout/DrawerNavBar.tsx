'use client';

import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import Logo from '@/icons/Logo';

import { cn } from '@/utilits';
import DashboradIcon from '@/icons/navbar/DashboradIcon';
import TradesIcon from '@/icons/navbar/TradesIcon';
import InvestmentsIcon from '@/icons/navbar/InvestmentsIcon';
import MatrixIcon from '@/icons/navbar/MatrixIcon';
import StackInvestmentIcon from '@/icons/navbar/StackInvestmentIcon';
import DepositIcon from '@/icons/navbar/DepositIcon';
import WithdrawIcon from '@/icons/navbar/WithdrawIcon';
import Button from '../Button';
import Link from 'next/link';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import logo from "/public/logo.png";

interface DrawerNavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerNavBar = ({ isOpen, onClose }: DrawerNavBarProps) => {
  const pathname = usePathname();
  const { data } = useGlobalSettings();
  const { resolvedTheme } = useTheme();

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: DashboradIcon },
    { name: 'Trades', href: '/trades', icon: TradesIcon },
    { name: 'Investments', href: '/investments', icon: InvestmentsIcon },
    { name: 'Matrix', href: '/matrix', icon: MatrixIcon },
    {
      name: 'Stacking Investment',
      href: '/stacking-investment',
      icon: StackInvestmentIcon,
    },
    { name: 'Deposit', href: '/deposit', icon: DepositIcon },
    { name: 'Withdraw', href: '/withdraw', icon: WithdrawIcon },
  ];
  // const logo = resolvedTheme === "dark" ? data?.dark_logo : data?.white_logo;


  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-start bg-opacity-50">
      <motion.div
        className="bg-white dark:bg-black w-[300px] h-full shadow-lg p-4"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Link href="https://glovertrade.io/">
              <Image
                src={logo}
                height={400}
                width={400}
                alt="logo"
                className="w-[2.4rem] object-contain"
              />
            </Link>
          </div>
          <div className="cursor-pointer" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 7L7 17M7 7L17 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:text-[#FFFAFA] text-black"
              />
            </svg>
          </div>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              className="flex items-center gap-2 mb-4"
              key={item.name}
              href={item.href}
              onClick={onClose}
            >
              <Button
                type="secondary"
                className={cn(
                  "group h-[38px] w-[38px] font-normal",
                  pathname === item.href
                    ? "bg-black dark:bg-white hover:dark:bg-white hover:bg-black"
                    : ""
                )}
              >
                <item.icon
                  className={cn(
                    "stroke-current font-normal",
                    pathname === item.href
                      ? "text-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                />
              </Button>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </motion.div>
    </div>,
    document.body
  );
};

export default DrawerNavBar;
