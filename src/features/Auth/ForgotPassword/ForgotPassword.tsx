'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { changePasswordSchema, resetPasswordSchema } from '@/schema/form';
import ChangePasswordForm from './components/ChangePasswordForm';
import { userChangePassword, userForgotPassword } from '@/actions/auth';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Toaster from '@/components/Toaster';

type ForgotFormValues = z.infer<typeof resetPasswordSchema>;
type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

function ForgotPassword() {
  const router = useRouter();
  const [forgotToken, setForgotToken] = useState<string>('');
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    register: changePasswordRegister,
    handleSubmit: changePasswordHandleSubmit,
    formState: { errors: changePasswordErrors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const {
    mutate: forgotPasswordMutate,
    isPending: isPendingForgotPassword,
    status: forgotPasswordStatus,
  } = useMutation<
    ForgotPasswordResponse,
    ErrorResponse,
    ForgotPasswordFormData
  >({
    mutationFn: userForgotPassword,
    onSuccess: (data) => {
      setForgotToken(data.data.token.toString());
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const {
    mutate: changePasswordMutate,
    isPending: isPendingChangePassword,
    status: changePasswordStatus,
  } = useMutation<
    ChangePasswordResponse,
    ErrorResponse,
    ChangePasswordFormData
  >({
    mutationFn: userChangePassword,
    onSuccess: (data) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      router.push('/signin');
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const handleForgotPassword: SubmitHandler<ForgotFormValues> = (
    data: ForgotFormValues
  ) => {
    forgotPasswordMutate(data);
  };

  const handleChangePassword: SubmitHandler<ChangePasswordFormValues> = (
    data: ChangePasswordFormValues
  ) => {
    changePasswordMutate({ ...data, token: forgotToken });
  };

  return (
    <>
      {!forgotToken ? (
        <ForgotPasswordForm
          register={register}
          onForgotPassword={handleSubmit(handleForgotPassword)}
          errors={errors}
          isLoadingForgotPassword={isPendingForgotPassword}
        />
      ) : (
        <ChangePasswordForm
          register={changePasswordRegister}
          onChange={changePasswordHandleSubmit(handleChangePassword)}
          errors={changePasswordErrors}
          isLoadingChangePassword={isPendingChangePassword}
        />
      )}
      <Toaster
        message={toasterMessage}
        type={
          (forgotPasswordStatus || changePasswordStatus) as 'success' | 'error'
        }
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
}

export default ForgotPassword;
