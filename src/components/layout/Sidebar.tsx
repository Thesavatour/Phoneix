'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DashboradIcon from '@/icons/navbar/DashboradIcon';
import DepositIcon from '@/icons/navbar/DepositIcon';
import InvestmentsIcon from '@/icons/navbar/InvestmentsIcon';
import MatrixIcon from '@/icons/navbar/MatrixIcon';
import StackInvestmentIcon from '@/icons/navbar/StackInvestmentIcon';
import TradesIcon from '@/icons/navbar/TradesIcon';
import WithdrawIcon from '@/icons/navbar/WithdrawIcon';
import Tooltip from '../Tooltip';
import Button from '../Button';
import { cn } from '@/utilits';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', hrefs: ['/'], icon: DashboradIcon },
    { name: 'Trades', hrefs: ['/trades'], icon: TradesIcon },
    { name: 'Investments', hrefs: ['/investments'], icon: InvestmentsIcon },
    { name: 'Matrix', hrefs: ['/matrix'], icon: MatrixIcon },
    {
      name: 'Stacking Investment',
      hrefs: ['/stacking-investment'],
      icon: StackInvestmentIcon,
    },
    { name: 'Deposit', hrefs: ['/deposit'], icon: DepositIcon },
    { name: 'Withdraw', hrefs: ['/withdraw'], icon: WithdrawIcon },
  ];

  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-20 p-6 md:block hidden">
      <ul className="space-y-4">
        {menuItems.map((item) => {
          const isActive = item.hrefs.some((href) =>
            href === '/' ? pathname === '/' : pathname.startsWith(href)
          );
          return (
            <li key={item.name}>
              <Tooltip content={item.name}>
                <Link href={item.hrefs[0]} prefetch={false}>
                  <Button
                    type="secondary"
                    className={cn(
                      'group h-[38px] w-[38px] font-normal',
                      isActive
                        ? 'bg-black dark:bg-white hover:dark:bg-white hover:bg-black'
                        : ''
                    )}
                  >
                    <item.icon
                      className={cn(
                        'stroke-current font-normal',
                        isActive
                          ? 'text-white dark:text-black'
                          : 'text-gray-700 dark:text-gray-300'
                      )}
                    />
                  </Button>
                </Link>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
