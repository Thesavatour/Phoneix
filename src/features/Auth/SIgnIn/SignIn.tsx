'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import SignInForm from './components/SignInForm';
import { signInSchema } from '@/schema/form';
import Toaster from '@/components/Toaster';
import { userSignIn } from '@/actions/auth';
import CookieService from '@/services/cookieService';

type SignInFormValues = z.infer<typeof signInSchema>;

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  const {
    mutate: signInMutate,
    isPending,
    status,
  } = useMutation<AuthResponse, ErrorResponse, SignInFormValues>({
    mutationFn: userSignIn,
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

  const handleLogin: SubmitHandler<SignInFormValues> = (data) => {
    signInMutate(data);
  };

  return (
    <>
      <div className="w-full flex justify-center p-4">
        <SignInForm
          register={register}
          onLogin={handleSubmit(handleLogin)}
          errors={errors}
          isLoadingSignIn={isPending}
        />
      </div>
      <Toaster
        message={toasterMessage}
        type={status as 'success' | 'error'}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
}

export default SignIn;
