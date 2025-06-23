'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import EmailIcon from '@/icons/auth/EmailIcon';
import PasswordIcon from '@/icons/auth/PasswordIcon';
import { CloseEyeIcon, OpenEyeIcon } from '@/icons/auth/EyeIcon';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import CodeIcon from '@/icons/auth/CodeIcon';
import PinIcon from '@/icons/auth/PinIcon';
import logo from "/public/logo.png";
import Link from 'next/link';

interface Props {
  isLoadingChangePassword?: boolean;
  register: UseFormRegister<{
    email: string;
    password: string;
    password_confirmation: string;
    token?: string;
  }>;
  onChange: (evt: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<{
    email: string;
    password: string;
    password_confirmation: string;
    token?: string;
  }>;
}

function ChangePasswordForm({
  isLoadingChangePassword,
  register,
  onChange,
  errors,
}: Props) {
  const { data } = useGlobalSettings();
  const { resolvedTheme } = useTheme();
  // const logo = resolvedTheme === 'dark' ? data?.dark_logo : data?.white_logo;
  const [passwordVisible, setPasswordVisible] = useState<{
    password?: 'password' | 'text';
    password_confirmation?: 'password' | 'text';
  }>({
    password: 'password',
    password_confirmation: 'password',
  });

  const handlePasswordVisibility = () => {
    setPasswordVisible((prev) => ({
      ...prev,
      password: prev.password === 'password' ? 'text' : 'password',
    }));
  };
  const handleConfirmPasswordVisibility = () => {
    setPasswordVisible((prev) => ({
      ...prev,
      password_confirmation:
        prev.password_confirmation === 'password' ? 'text' : 'password',
    }));
  };
  return (
    <form
      onSubmit={onChange}
      className="w-full flex flex-col justify-center max-w-[584px] p-12 border border-[#E4E4E2] dark:border-white-rgba-006 bg-white dark:bg-white-rgba-008 rounded-[30px] space-y-6"
      aria-labelledby="signInFormTitle"
    >
      <header className="flex justify-center flex-col items-center">
        <div className="flex gap-2 items-center mb-[18px]">
          <Link href="https://glovertrade.io/">
            <Image
              src={logo}
              height={100}
              width={100}
              alt="logo"
              className="w-[2.4rem] object-contain"
            />
          </Link>
        </div>
        <h2
          id="signInFormTitle"
          className="text-[28px] text-black dark:text-white font-medium leading-[25px]"
        >
          Reset Password
        </h2>
      </header>
      <section className="space-y-6">
        <InputField
          className="dark:bg-white-rgba-008 h-11"
          label="Code"
          placeholder="Enter Code"
          leading={<PinIcon />}
          {...register("token")}
          error={errors.token?.message}
        />
        <InputField
          className="dark:bg-white-rgba-008 h-11"
          label="Email"
          placeholder="Email"
          leading={<EmailIcon />}
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          className="dark:bg-white-rgba-008 h-11"
          label="Password"
          placeholder="Password"
          leading={<PasswordIcon />}
          trailing={
            <div className="cursor-pointer" onClick={handlePasswordVisibility}>
              {passwordVisible.password === "password" ? (
                <CloseEyeIcon />
              ) : (
                <OpenEyeIcon />
              )}
            </div>
          }
          type={passwordVisible.password}
          {...register("password")}
          error={errors.password?.message}
          name="password"
        />
        <InputField
          className="dark:bg-white-rgba-008 h-11"
          label="Confirm Password"
          placeholder="Confirm Password"
          leading={<PasswordIcon />}
          trailing={
            <div
              className="cursor-pointer"
              onClick={handleConfirmPasswordVisibility}
            >
              {passwordVisible.password_confirmation === "password" ? (
                <CloseEyeIcon />
              ) : (
                <OpenEyeIcon />
              )}
            </div>
          }
          type={passwordVisible.password_confirmation}
          {...register("password_confirmation")}
          error={errors.password_confirmation?.message}
          name="password_confirmation"
        />
      </section>
      <Button
        loading={isLoadingChangePassword}
        className="w-full h-12"
        actionType="submit"
      >
        Reset Password
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
