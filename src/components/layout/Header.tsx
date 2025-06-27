'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import DropdownMenu from '@/components/DropdownMenu';
import ThemeSwitch from '@/components/ThemeSwitch';
import Button from '../Button';
import MyAccountIcon from '@/icons/profile-dropdown/MyAccountIcon';
import RewardBadgesIcon from '@/icons/profile-dropdown/RewardBadgesIcon';
import WalletTopUpIcon from '@/icons/profile-dropdown/WalletTopUpIcon';
import Logout from '@/icons/profile-dropdown/Logout';
import DrawerNavBar from './DrawerNavBar';
import logo from '/public/logo.png';
import CookieService from '@/services/cookieService';
import { useUser } from '../Provider/UserProvider';
import { useMutation } from '@tanstack/react-query';
import { userLogout } from '@/actions/auth';
import Toaster from '../Toaster';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import Tooltip from '../Tooltip';
import { cn } from '@/utilits';

const dropdownMenu = [
  {
    label: 'My Account',
    Icon: <MyAccountIcon />,
    link: '/settings',
  },
  {
    label: 'Rewards Badge',
    Icon: <RewardBadgesIcon />,
    link: '/reward-badges',
  },

  {
    label: 'Wallet Top Up',
    Icon: <WalletTopUpIcon />,
    link: '/top-up',
  },
];

export const Header = () => {
  const userInfo = useUser();
  const { data } = useGlobalSettings();
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const {
    mutate: logoutMutate,
    isPending,
    status,
  } = useMutation<LogoutResponse, ErrorResponse>({
    mutationFn: userLogout,
    onSuccess: (data) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      CookieService.remove('access_token');
      window.location.href = "https://glovertrade.io/";
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  const logoUrl = resolvedTheme === 'dark' ? data?.dark_logo : data?.white_logo;
  const pathname = usePathname();

  return (
    <>
      <header
        style={{ padding: "24px" }}
        className="w-full fixed top-0 left-0 dark:header-dark-gradient-border header-light-gradient-border flex justify-between items-center py-5 bg-[#F9F9F9] dark:bg-[#000] z-[999]"
      >
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          <div className="flex items-center gap-[10px]">
            <div className="hidden md:flex items-center gap-[10px]">
              <Link href="https://phoneixtrading.com/">
                <Image
                  src={logo}
                  alt="Crypt Logo"
                  height={24}
                  width={24}
                  className="w-[2.4rem] object-contain"
                />
              </Link>
            </div>

            <button
              className="md:hidden flex items-center"
              aria-label="Toggle Menu"
              onClick={toggleDrawer}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21M3 6H21M3 18H15"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-black dark:text-white"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <Tooltip content="Transactions">
            <Link href="/transactions">
              <div
                className={cn(
                  "border dark:border-[#313131] border-[#E4E4E2] flex items-center rounded-lg p-[10px] h-9 w-9",
                  pathname === "/transactions"
                    ? "bg-white"
                    : "bg-black dark:bg-white-rgba-10"
                )}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6663 6.08366C13.0806 6.08366 13.4163 5.74787 13.4163 5.33366C13.4163 4.91945 13.0806 4.58366 12.6663 4.58366V6.08366ZM4.52603 3.59889L3.99807 3.0662L3.99807 3.0662L4.52603 3.59889ZM5.99423 3.19968C6.28843 2.9081 6.29055 2.43323 5.99897 2.13903C5.70738 1.84484 5.23251 1.84272 4.93832 2.1343L5.99423 3.19968ZM11.6068 12.4018L12.1348 12.9345L11.6068 12.4018ZM10.1386 12.801C9.84441 13.0926 9.8423 13.5674 10.1339 13.8616C10.4255 14.1558 10.9003 14.1579 11.1945 13.8664L10.1386 12.801ZM12.7893 10.8341L13.5333 10.9289V10.9289L12.7893 10.8341ZM3.33301 9.91699C2.9188 9.91699 2.58301 10.2528 2.58301 10.667C2.58301 11.0812 2.9188 11.417 3.33301 11.417V9.91699ZM12.7932 10.8003L13.5393 10.876L12.7932 10.8003ZM3.50056 6.08366H12.6663V4.58366H3.50056V6.08366ZM5.05398 4.13158L5.99423 3.19968L4.93832 2.1343L3.99807 3.0662L5.05398 4.13158ZM3.99807 3.0662C3.63568 3.42537 3.31807 3.73856 3.09048 4.02195C2.85339 4.31717 2.6531 4.65175 2.59957 5.07172L4.08753 5.26138C4.09173 5.22844 4.10776 5.15078 4.26002 4.96119C4.42178 4.75977 4.66654 4.51558 5.05398 4.13158L3.99807 3.0662ZM11.0789 11.8691L10.1386 12.801L11.1945 13.8664L12.1348 12.9345L11.0789 11.8691ZM12.1348 12.9345C12.4972 12.5753 12.8148 12.2621 13.0424 11.9787C13.2795 11.6835 13.4797 11.3489 13.5333 10.9289L12.0453 10.7393C12.0411 10.7722 12.0251 10.8499 11.8728 11.0395C11.7111 11.2409 11.4663 11.4851 11.0789 11.8691L12.1348 12.9345ZM12.047 10.7247C12.0465 10.7295 12.0459 10.7344 12.0453 10.7393L13.5333 10.9289C13.5355 10.9113 13.5375 10.8937 13.5393 10.876L12.047 10.7247ZM12.6663 9.91699H3.33301V11.417H12.6663V9.91699ZM13.5393 10.876C13.5967 10.3098 13.1315 9.917 12.6663 9.91699L12.6663 11.417C12.3488 11.417 12.0045 11.144 12.047 10.7247L13.5393 10.876ZM3.50056 4.58366C3.79209 4.58366 4.14121 4.84025 4.08753 5.26138L2.59957 5.07172C2.52249 5.67643 3.02396 6.08366 3.50056 6.08366V4.58366Z"
                    fill="currentColor"
                    className={cn(
                      pathname === "/transactions" ? "text-black" : "text-white"
                    )}
                  />
                </svg>
              </div>
            </Link>
          </Tooltip>
          <div
            className={
              "border dark:border-[#313131] border-[#E4E4E2] flex items-center rounded-lg p-2 bg-black dark:bg-white-rgba-10 h-9"
            }
          >
            <div className="flex items-center gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.66666 6H4.66666"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-white"
                />
                <path
                  d="M14.6667 7.31376V8.68713C14.6667 9.0538 14.3734 9.35377 14 9.36711H12.6933C11.9733 9.36711 11.3134 8.84044 11.2534 8.12044C11.2134 7.70044 11.3733 7.30711 11.6533 7.03377C11.9 6.78044 12.24 6.63379 12.6133 6.63379H14C14.3734 6.64712 14.6667 6.94709 14.6667 7.31376Z"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-white"
                />
                <path
                  d="M11.6533 7.033C11.3733 7.30633 11.2133 7.69967 11.2533 8.11967C11.3133 8.83967 11.9733 9.36633 12.6933 9.36633H14V10.333C14 12.333 12.6667 13.6663 10.6667 13.6663H4.66667C2.66667 13.6663 1.33334 12.333 1.33334 10.333V5.66634C1.33334 3.85301 2.42667 2.58634 4.12667 2.37301C4.3 2.34634 4.48 2.33301 4.66667 2.33301H10.6667C10.84 2.33301 11.0067 2.33967 11.1667 2.36633C12.8867 2.56633 14 3.83967 14 5.66634V6.63302H12.6133C12.24 6.63302 11.9 6.77967 11.6533 7.033Z"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="text-white"
                />
              </svg>
              <div className="flex items-center gap-1">
                <span className="text-sm leading-[21px] text-white">
                  {data?.currency_symbol}
                  {userInfo.wallet.primary_balance}
                </span>
              </div>
            </div>
          </div>
          <DropdownMenu
            button={
              <Image
                height={36}
                width={36}
                src={userInfo.users.image}
                alt="user avatar"
                className="rounded-full h-[36px] w-[36px] border dark:border-[#313131] border-[#E4E4E2] cursor-pointer"
              />
            }
            optionClassName="!min-w-[239px] p-0"
          >
            <div>
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E4E4E2] dark:border-[#313131]">
                <Image
                  height={36}
                  width={36}
                  src={userInfo.users.image}
                  alt="user avatar"
                  className="rounded-full h-[36px] w-[36px] border dark:border-[#313131] border-[#E4E4E2]"
                />
                <div>
                  <p className="text-black dark:text-white text-[18px] font-semibold">
                    {userInfo.users.full_name}
                  </p>
                  <p className="text-sm dark:text-white text-black">
                    @{userInfo.users.full_name?.toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4">
                {dropdownMenu.map((item, index) => (
                  <Link key={index} href={item.link}>
                    <Button
                      key={index}
                      type="plaintext"
                      className="hover:bg-primary w-full justify-start dark:text-white text-black hover:text-black dark:hover:text-black group"
                    >
                      {item.Icon}
                      <span className="ml-3">{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
              <div className="border-t border-[#E4E4E2] dark:border-[#313131] px-6 py-4">
                <Button
                  loading={isPending}
                  onClick={handleLogout}
                  type="plaintext"
                  className="hover:bg-primary w-full justify-start dark:text-white text-black hover:text-black dark:hover:text-black group"
                >
                  <Logout />
                  <span className="ml-3">Sign out</span>
                </Button>
              </div>
            </div>
          </DropdownMenu>
        </div>
      </header>
      <DrawerNavBar isOpen={isDrawerOpen} onClose={toggleDrawer} />
      <Toaster
        message={toasterMessage}
        type={status as "success" | "error"}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
};
