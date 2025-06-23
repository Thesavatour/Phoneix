'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Modal from '@/components/Modal';
import { instaPinGenerate, instaPinRecharge } from '@/actions/instapin';
import Toaster from '@/components/Toaster';
import { getValidStatus } from '@/utilits';

interface InstaPINRechargeProps {
  type: string;
  btnText: string;
  title: string;
  icon: React.ReactNode;
}

function InstaPINRechargeCard({
  btnText,
  title,
  icon,
  type,
}: InstaPINRechargeProps) {
  const queryClient = useQueryClient();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const {
    mutate: instaPinGenerateMute,
    isPending,
    status,
  } = useMutation({
    mutationFn: instaPinGenerate,
    onSuccess: (data: any) => {
      if (data) {
        setToasterMessage(data.message);
        setToasterOpen(true);
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ['insta-pins'] });
        setInputValue('');
      }
    },
    onError: (error: any) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
      setInputValue('');
    },
  });

  const {
    mutate: instaRechargePinMute,
    isPending: isPendingRecharge,
    status: statusRecharge,
  } = useMutation({
    mutationFn: instaPinRecharge,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['insta-pins'] });
      if (data) {
        setToasterMessage(data.message);
        setToasterOpen(true);
        setIsOpen(false);
        setInputValue('');
      }
    },
    onError: (error: any) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
      setInputValue('');
    },
  });

  const handleSubmit = () => {
    if (type === 'recharge') {
      instaRechargePinMute({ pin_number: inputValue });
    } else {
      instaPinGenerateMute({ amount: Number(inputValue) });
    }
  };
  return (
    <>
      <div className="relative border dark:border-[#313131] border-[#E4E4E2] dark:bg-white/10 bg-white backdrop-blur-[17.5px] w-full px-4 py-5 overflow-hidden rounded-[16px]">
        <div className="absolute w-[100px] h-[100px] bg-primary blur-[140px] top-[-7px] left-[281px] dark:block hidden"></div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {icon}
            <div className="dark:text-[#ACB5BB] text-[16px] leading-6 font-normal">
              {title}
            </div>
          </div>
          <Button onClick={handleOpen}>{btnText}</Button>
        </div>
      </div>
      {isOpen && (
        <Modal size="sm" bg="default" isOpen={isOpen} onClose={handleOpen}>
          <Modal.Body>
            <p className="text-center font-medium text-[20px] dark:text-white-rgba-90 border-b text-black border-white-rgba-10 pb-5">
              {type === 'recharge' ? 'Top Up Now' : 'Generated New Pins'}
            </p>
            <p className="text-[18px] font-medium dark:text-white-rgba-90 text-black leading-[27px] my-5">
              {type === 'recharge'
                ? ' The amount will be deducted from your primary wallet.'
                : 'This InstaPIN recharge only adds to the primary wallet'}
            </p>

            <div className="border-b border-white-rgba-10 pb-8">
              <div className="space-y-5 w-full">
                <div className="w-full">
                  <InputField
                    onChange={handleInputChange}
                    label={type === 'recharge' ? 'Pin Number' : 'Amount'}
                    value={inputValue}
                    placeholder={
                      type === 'recharge' ? 'Enter Pin Number' : 'Enter Amount'
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button
                loading={isPending || isPendingRecharge}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                onClick={handleOpen}
                type="dark"
                className="font-normal border-none"
              >
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <Toaster
        message={toasterMessage}
        type={getValidStatus(status, statusRecharge)}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
}

export default InstaPINRechargeCard;
