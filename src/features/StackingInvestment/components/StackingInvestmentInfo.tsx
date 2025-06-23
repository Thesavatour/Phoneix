'use client';
import { useState } from 'react';

import Button from '@/components/Button';
import VerticalLine from '@/components/VerticalLine';
import Modal from '@/components/Modal';
import InputField from '@/components/InputField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStackingInvest } from '@/actions/stacking-investment';
import Toaster from '@/components/Toaster';
import { getValidStatus } from '@/utilits';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import { set } from 'zod';

interface StackingInvestmentInfoProps {
  interrest: string;
  duration: number;
  id: number;
  maximum_amount: string;
  minimum_amount: string;
}

function StackingInvestmentInfo({
  id,
  interrest,
  duration,
  maximum_amount,
  minimum_amount,
}: StackingInvestmentInfoProps) {
  const queryClient = useQueryClient();
  const { data } = useGlobalSettings();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const {
    mutate: stackingInvestmentMute,
    isPending,
    status,
  } = useMutation({
    mutationFn: createStackingInvest,
    onSuccess: (data: any) => {
      if (data) {
        setToasterMessage(data.message);
        setToasterOpen(true);
        setIsOpen(false);
      }
      setAmount('');
      queryClient.invalidateQueries({ queryKey: ['investments-statistics'] });
    },
    onError: (error: any) => {
      setToasterOpen(true);
      setAmount('');
      setIsOpen(false);
      setToasterMessage(error.response.data.message);
    },
  });
  const handleInvest = () => {
    stackingInvestmentMute({ amount: Number(amount), plan_id: id });
  };

  return (
    <>
      <div className="relative border dark:border-[#313131] border-[#E4E4E2] dark:bg-white/10 bg-white backdrop-blur-[17.5px] w-full p-4 overflow-hidden rounded-2xl">
        <div className="absolute w-[102px] h-[102px] bg-primary blur-[140px] top-0 left-0 dark:block hidden"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-0 lg:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 xl:gap-10">
            <div className="h-[78px] w-[101px] flex flex-col justify-center items-center dark:bg-white-rgba-23 bg-green rounded-xl">
              <p className="dark:text-primary text-[24px] font-semibold leading-9">
                {interrest}%
              </p>
              <p className="dark:text-primary">Interest</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="dark:text-white-rgba-90 text-[16px] leading-6">
                Duration
              </p>
              <p className="dark:text-white-rgba-90 text-[16px] leading-6 font-medium">
                {duration} Days
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <VerticalLine height="56px" color="#313131" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 xl:gap-10">
            <div className="text-center sm:text-left">
              <p className="dark:text-white-rgba-90 text-center text-[16px] leading-6">
                Capital Limit
              </p>
              <p className="dark:text-white-rgba-90 text-[16px] leading-6 font-medium">
                {data?.currency_symbol}
                {minimum_amount} - {data?.currency_symbol}
                {maximum_amount}
              </p>
            </div>

            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
              <Button
                onClick={handleOpen}
                className="min-w-[120px] px-4 py-2 text-center"
              >
                Invest Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <>
          <Modal size="sm" bg="default" isOpen={isOpen} onClose={handleOpen}>
            <Modal.Body>
              <p className="text-center font-medium text-[20px] dark:text-white-rgba-90 text-black  pb-[17px]">
                Stacking Invest Now
              </p>
              <div className="border-b border-white-rgba-10 pb-8">
                <div className="space-y-5 w-full">
                  <InputField
                    label={`Amount (${data?.currency_symbol}${minimum_amount} - ${data?.currency_symbol}${maximum_amount})`}
                    value={amount}
                    placeholder="Enter Amount"
                    trailing={
                      <p className="dark:text-black text-white text-[15px]">
                        {data?.currency_name}
                      </p>
                    }
                    onChange={handleChangeAmount}
                    trailingBg="dark:bg-white-rgba-90 bg-black"
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <Button loading={isPending} onClick={handleInvest}>
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
        </>
      )}
      <Toaster
        message={toasterMessage}
        type={status as StatusType}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
}

export default StackingInvestmentInfo;
