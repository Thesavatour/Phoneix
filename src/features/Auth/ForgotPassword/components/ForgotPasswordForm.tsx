'use client';

import Link from 'next/link';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import EmailIcon from '@/icons/auth/EmailIcon';
import Logo from '@/icons/Logo';
import Image from 'next/image';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import { useTheme } from 'next-themes';
import logo from "/public/logo.png";

interface Props {
  isLoadingForgotPassword?: boolean;
  register: UseFormRegister<{ email: string }>;
  onForgotPassword: (evt: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<{ email: string }>;
}

function ForgotPasswordForm({
  isLoadingForgotPassword,
  register,
  onForgotPassword,
  errors,
}: Props) {
  const { data } = useGlobalSettings();
  const { resolvedTheme } = useTheme();
  // const logo = resolvedTheme === 'dark' ? data?.dark_logo : data?.white_logo;

  return (
    <form
      onSubmit={onForgotPassword}
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
          className="text-[28px] text-black dark:text-white font-medium leading-[25px] select-none"
        >
          Forgot password?
        </h2>
      </header>

      <section>
        <InputField
          className="dark:bg-white-rgba-008 h-11"
          label="Email"
          placeholder="Email"
          leading={<EmailIcon />}
          {...register("email")}
          error={errors.email?.message}
        />
      </section>
      <Button
        loading={isLoadingForgotPassword}
        className="w-full h-12"
        actionType="submit"
      >
        Forgot Password
      </Button>
      <footer className="text-black dark:text-white text-sm leading-5 text-center">
        Remember your password?{" "}
        <Link href="/sign-in" className="text-black dark:text-primary">
          Sign In
        </Link>
      </footer>
    </form>
  );
}

export default ForgotPasswordForm;
