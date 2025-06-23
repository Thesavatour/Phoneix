'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import BlurCircle from '@/components/BlurCircle';
import TransparentCard from '@/components/TransparentCard';
import BalanceCard from './components/BalanceCard';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import DeleteIcon from '@/icons/DeleteIcon';
import { userUpdate } from '@/actions/users';
import { userSchema } from '@/schema/user';
import { useUser } from '@/components/Provider/UserProvider';
import Toaster from '@/components/Toaster';

function General() {
  const userInfo = useUser();
  const queryClient = useQueryClient();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    post_code: '',
    address: '',
    state: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formErrors, setFormErrors] = useState<
    Record<string, { message?: string; type?: string }>
  >({});

  const {
    mutate: userUpdateMutate,
    isPending,
    status,
  } = useMutation<UserUpdateResponse, ErrorResponse, FormData>({
    mutationFn: userUpdate,
    onSuccess: (data) => {
      setToasterMessage(data.message);
      setToasterOpen(true);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      userSchema.parse(state);
      const formData = new FormData();
      formData.append('first_name', state.first_name);
      formData.append('last_name', state.last_name);
      formData.append('email', state.email);
      formData.append('phone', state.phone);
      formData.append('meta[address][address]', state.address);
      formData.append('meta[address][city]', state.city);
      formData.append('meta[address][post_code]', state.post_code);
      formData.append('meta[address][state]', state.state);
      formData.append('meta[address][country]', state.country);

      if (file) {
        formData.append('image', file);
      }

      userUpdateMutate(formData);
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, { message: string }> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          errors[field] = { message: err.message };
        });
        setFormErrors(errors);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      setState({
        first_name: userInfo?.users?.first_name ?? '',
        last_name: userInfo?.users?.last_name ?? '',
        email: userInfo?.users?.email ?? '',
        phone: userInfo?.users?.phone ?? '',
        country: userInfo?.users?.meta?.address?.country ?? '',
        city: userInfo?.users?.meta?.address?.city ?? '',
        post_code: userInfo?.users?.meta?.address?.post_code || '',
        address: userInfo?.users?.meta?.address?.address || '',
        state: userInfo?.users?.meta?.address?.state,
      });
    }
  }, [userInfo]);

  const WalletBalance = [
    { title: 'Primary Balance', balance: userInfo?.wallet?.primary_balance },
    {
      title: 'Investment Balance',
      balance: userInfo?.wallet?.investment_balance,
    },
    { title: 'Trade Balance', balance: userInfo?.wallet?.trade_balance },
  ];

  return (
    <>
      <TransparentCard className="p-0">
        <BlurCircle className="w-[228px] h-[227px] top-[230px] left-[503px] blur-[350px] dark:block hidden" />
        <BlurCircle className="w-[83px] h-[90px] top-[46px] left-[16px] dark:block hidden" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="p-5 border-b dark:border-[#303030] border-[#0000001A]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[18px] text-black dark:text-white leading-[27px] font-medium">
                  Profile
                </p>
                <p className="text-sm text-black dark:text-[#ACB5BB] leading-[21px]">
                  Manage your personal information and security options.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button loading={isPending} actionType="submit" type="primary">
                  {isPending ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-5">
            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <p className="text-base leading-6 text-white mb-[10px]">
                  Profile Picture
                </p>
                <div className="flex gap-3 items-center">
                  <Image
                    height={90}
                    width={90}
                    src={
                      preview ||
                      userInfo?.users?.image ||
                      'https://images.unsplash.com/photo-1721390336122-c883e2b5c113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D'
                    }
                    alt="profile avatar"
                    className="rounded-full h-[90px] w-[90px]"
                  />
                  <Button
                    className="border-[#0000001A] bg-green"
                    onClick={handleButtonClick}
                    type="light"
                  >
                    Change Profile
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {WalletBalance.map((item, index) => (
                  <div className="flex-1" key={index}>
                    <BalanceCard {...item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-5">
                <InputField
                  label="First Name"
                  value={state.first_name}
                  onChange={(e) => handleInputChange(e, 'first_name')}
                  placeholder="Enter first name"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                  error={formErrors.first_name?.message}
                />

                <InputField
                  label="Email"
                  type="email"
                  value={state.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  placeholder="Enter email"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                  error={formErrors.email?.message}
                />

                <InputField
                  label="Country"
                  value={state.country}
                  onChange={(e) => handleInputChange(e, 'country')}
                  placeholder="Enter country"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                />
              </div>
              <div className="space-y-5">
                <InputField
                  label="Last Name"
                  value={state.last_name}
                  onChange={(e) => handleInputChange(e, 'last_name')}
                  placeholder="Enter last name"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                  error={formErrors.last_name?.message}
                />
                <InputField
                  label="Phone"
                  value={state.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  placeholder="Enter phone"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                  error={formErrors.phone?.message}
                />
                <InputField
                  label="City"
                  value={state.city || ''}
                  onChange={(e) => handleInputChange(e, 'city')}
                  placeholder="Enter city"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                />
              </div>
              <div className="space-y-5">
                <InputField
                  label="Post Code"
                  value={state.post_code}
                  onChange={(e) => handleInputChange(e, 'post_code')}
                  placeholder="Enter post code"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                />

                <InputField
                  label="Address"
                  value={state.address}
                  onChange={(e) => handleInputChange(e, 'address')}
                  placeholder="Enter address"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                />
              </div>
              <div className="space-y-5">
                <InputField
                  label="State"
                  value={state.state}
                  onChange={(e) => handleInputChange(e, 'state')}
                  placeholder="Enter state"
                  className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] w-full"
                />
              </div>
            </div>
          </div>
        </form>
      </TransparentCard>
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

export default General;
