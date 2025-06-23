'use client';

import { ChangeEvent, useState } from 'react';

import BlurCircle from '@/components/BlurCircle';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import TransparentCard from '@/components/TransparentCard';

function Security() {
  const [state, setState] = useState({
    first_name: '',
    email: '',
    country: '',
  });
  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, first_name: e.target.value });
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, email: e.target.value });
  };
  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, country: e.target.value });
  };
  const handleEnable = () => {
    console.log('Enable');
  };
  return (
    <TransparentCard className="p-0">
      <BlurCircle className="w-[83px] h-[90px] top-[46px] left-4 hidden dark:block" />
      <div className="p-5 border-b dark:border-[#303030] border-[#0000001A]">
        <p className="text-[18px] dark:text-white leading-[27px] font-medium">
          Security
        </p>
        <p className="text-sm dark:text-[#ACB5BB] leading-[21px]">
          Manage your personal information and security options.
        </p>
      </div>
      <div className="grid grid-cols-2">
        <div className="border-r dark:border-[#303030] border-[#0000001A] p-5">
          <div className="space-y-5">
            <InputField
              label="First Name"
              value={state.first_name}
              onChange={handleFirstNameChange}
              placeholder="Enter first name"
              className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
            />
            <InputField
              label="Email"
              value={state.email}
              onChange={handleEmailChange}
              placeholder="Enter email"
              className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
            />
            <InputField
              label="Country"
              value={state.country}
              onChange={handleCountryChange}
              placeholder="Enter country"
              className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
            />
          </div>
        </div>
        <div className="p-5">
          <p className="text-base leading-6 dark:text-white mb-2">
            Two-Factor Authentication
          </p>
          <p className="dark:text-[#ACB5BB] text-sm leading-[21px] mb-8">
            Enable/disable 2FA to enhance account security.
          </p>
          <Button onClick={handleEnable} className="w-[110px]">
            Enable
          </Button>
        </div>
      </div>
    </TransparentCard>
  );
}

export default Security;
