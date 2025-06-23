'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import EmailIcon from '@/icons/auth/EmailIcon';
import { CloseEyeIcon, OpenEyeIcon } from '@/icons/auth/EyeIcon';
import PasswordIcon from '@/icons/auth/PasswordIcon';
import UserIcon from '@/icons/auth/UserIcon';
import OutlineUserIcon from '@/icons/auth/OutlineUserIcon';

interface Props {
  register: UseFormRegister<{
    email: string;
    password: string;
    name: string;
    password_confirmation: string;
    referral_id?: string | null;
  }>;
  onSignUp: (evt: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<{
    email: string;
    password: string;
    name: string;
    password_confirmation: string;
    referral_id?: string | null;
  }>;
  isLoadingSignUp?: boolean;
}

function SignUpForm({ register, onSignUp, errors, isLoadingSignUp }: Props) {
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
      onSubmit={onSignUp}
      className="w-full p-12 border border-[#E4E4E2] dark:border-white-rgba-006 bg-white dark:bg-white-rgba-008 rounded-[30px] space-y-6"
    >
      <InputField
        className="dark:bg-white-rgba-008 h-11"
        label="Referral ID"
        placeholder="Referral ID"
        leading={<OutlineUserIcon />}
        {...register('referral_id')}
        error={errors.referral_id?.message}
        name="referral_id"
      />

      <InputField
        className="dark:bg-white-rgba-008 h-11"
        label="Full Name"
        placeholder="Full Name"
        leading={<UserIcon />}
        {...register('name')}
        error={errors.name?.message}
        name="name"
      />

      <InputField
        className="dark:bg-white-rgba-008 h-11"
        label="Email"
        placeholder="Email"
        leading={<EmailIcon />}
        {...register('email')}
        error={errors.email?.message}
        name="email"
      />

      <InputField
        className="dark:bg-white-rgba-008 h-11"
        label="Password"
        placeholder="Password"
        leading={<PasswordIcon />}
        trailing={
          <div className="cursor-pointer" onClick={handlePasswordVisibility}>
            {passwordVisible.password === 'password' ? (
              <CloseEyeIcon />
            ) : (
              <OpenEyeIcon />
            )}
          </div>
        }
        type={passwordVisible.password}
        {...register('password')}
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
            {passwordVisible.password_confirmation === 'password' ? (
              <CloseEyeIcon />
            ) : (
              <OpenEyeIcon />
            )}
          </div>
        }
        type={passwordVisible.password_confirmation}
        {...register('password_confirmation')}
        error={errors.password_confirmation?.message}
        name="password_confirmation"
      />

      <Button
        loading={isLoadingSignUp}
        actionType="submit"
        className="w-full h-12"
      >
        Sign Up
      </Button>

      <p className="text-black dark:text-white text-sm leading-5 text-center space-x-1">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-black dark:text-primary">
          Sign In
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;
