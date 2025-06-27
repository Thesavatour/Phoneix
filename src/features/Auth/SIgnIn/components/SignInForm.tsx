'use client';
import Link from 'next/link';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useState } from 'react';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import EmailIcon from '@/icons/auth/EmailIcon';
import GoogleIcon from '@/icons/auth/GoogleIcon';
import PasswordIcon from '@/icons/auth/PasswordIcon';
import Logo from '@/icons/Logo';
import { CloseEyeIcon, OpenEyeIcon } from '@/icons/auth/EyeIcon';
import Image from 'next/image';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import { useTheme } from 'next-themes';
import logo from "/public/logo.png";

interface Props {
  isLoadingSignIn?: boolean;
  register: UseFormRegister<{ email: string; password: string }>;
  onLogin: (evt: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<{ email: string; password: string }>;
}

function SignInForm({ isLoadingSignIn, register, onLogin, errors }: Props) {
  const { data } = useGlobalSettings();
  const { resolvedTheme } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<{
    password?: 'password' | 'text';
  }>({
    password: 'password',
  });
  const handlePasswordVisibility = () => {
    setPasswordVisible((prev) => ({
      password: prev.password === 'password' ? 'text' : 'password',
    }));
  };

  // const logo = resolvedTheme === 'dark' ? data?.dark_logo : data?.white_logo;

  return (
    <form
      onSubmit={onLogin}
      className="w-full flex flex-col justify-center max-w-[584px] p-12 border border-[#E4E4E2] dark:border-white-rgba-006 bg-white dark:bg-white-rgba-008 rounded-[30px] space-y-6"
      aria-labelledby="signInFormTitle"
    >
      <header className="flex justify-center flex-col items-center">
        <div className="flex gap-2 items-center mb-[18px]">
          <Link href="https://phoneixtrading.com/">
            <Image
              src={logo}
              height={400}
              width={400}
              alt="logo"
              className="w-[2.4rem] object-contain"
            />
          </Link>
        </div>
        <h2
          id="signInFormTitle"
          className="text-[20px] md:text-[28px]  text-black dark:text-white font-medium leading-[25px]"
        >
          Access Your Trading Hub
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

      <section>
        <InputField
          className="dark:bg-white-rgba-008 h-11"
          label="Password"
          type={passwordVisible.password}
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
          {...register("password")}
          error={errors.password?.message}
        />
        <div className="flex justify-end mt-2">
          <Link
            href="/reset-password"
            className="text-black dark:text-primary text-sm"
          >
            Forgot password?
          </Link>
        </div>
      </section>
      <Button
        loading={isLoadingSignIn}
        className="w-full h-12"
        actionType="submit"
      >
        Log In
      </Button>

      <footer className="text-black dark:text-white text-sm leading-5 text-center">
        Do not have an account?{" "}
        <Link href="/sign-up" className="text-black dark:text-primary">
          Sign Up
        </Link>
      </footer>
    </form>
  );
}

export default SignInForm;
