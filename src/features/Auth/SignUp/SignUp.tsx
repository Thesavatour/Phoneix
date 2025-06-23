'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signUpSchema } from '@/schema/form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import SecureIcon from '@/icons/auth/SecureIcon';
import Instructions from './components/Instructions';
import RewardsIcon from '@/icons/auth/RewardsIcon';
import SupportIcon from '@/icons/auth/SupportIcon';
import SignUpForm from './components/SignUpForm';
import { userSignUp } from '@/actions/auth';
import Toaster from '@/components/Toaster';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import CookieService from '@/services/cookieService';
import logo from "/public/logo.png";
import Link from 'next/link';

type SignUpFormValues = z.infer<typeof signUpSchema>;

const Icon = {
  1: <SecureIcon />,
  2: <RewardsIcon />,
  3: <SupportIcon />,
};

function SignUp() {
  const router = useRouter();
  const { data } = useGlobalSettings();
  const { resolvedTheme } = useTheme();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    mutate: signUpMutate,
    isPending,
    status,
  } = useMutation<AuthResponse, ErrorResponse, SignUpFormValues>({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      CookieService.set('access_token', data.data.access_token);
      router.push('/');
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const handleSingUp: SubmitHandler<SignUpFormValues> = (data) => {
    signUpMutate(data);
  };

  // const logo = resolvedTheme === 'dark' ? data?.dark_logo : data?.white_logo;

  return (
    <>
      <div className="flex justify-between items-center p-6 md:flex-nowrap flex-wrap  gap-6">
        <div className="w-full sm:w-1/2  md:w-full">
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
          <p className="text-2xl md:text-[32px] leading-9 dark:text-white text-black">
            {data?.sign_up_content.title}
          </p>
          <div className="space-y-8 mt-12 md:block hidden">
            {data?.sign_up_content.content.map((content, index) => (
              <Instructions
                key={index}
                icon={Icon[(index + 1) as 1 | 2 | 3]}
                title={content.title}
                description={content.details}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex-grow">
          <SignUpForm
            onSignUp={handleSubmit(handleSingUp)}
            errors={errors}
            register={register}
            isLoadingSignUp={isPending}
          />
        </div>
      </div>
      <Toaster
        message={toasterMessage}
        type={status as "success" | "error"}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
}

export default SignUp;
