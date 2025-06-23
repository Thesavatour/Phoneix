'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import BlurCircle from '@/components/BlurCircle';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Modal from '@/components/Modal';
import TransparentCard from '@/components/TransparentCard';
import InformationCricle from '@/icons/InformationCricle';
import TickIcon from '@/icons/TickIcon';
import { investmentNow } from '@/actions/investments';
import Toaster from '@/components/Toaster';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import { set } from 'zod';

interface InvestmentSchemeCardProps {
  plan: InvestmentPlan;
}

function InvestmentSchemeCard({ plan }: InvestmentSchemeCardProps) {
  const queryClient = useQueryClient();
  const { data } = useGlobalSettings();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [usd, setUsd] = useState('');

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsd(e.target.value);
  };

  const handleOpen = (value: string) => {
    setIsOpen(value);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const {
    mutate: investNowMutate,
    isPending,
    status,
  } = useMutation({
    mutationFn: investmentNow,
    onSuccess: (data: any) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      setIsOpen(null);
      queryClient.invalidateQueries({
        queryKey: ['investments-statistics'],
      });
      setUsd('');
    },
    onError: (error: any) => {
      setToasterOpen(true);
      setIsOpen(null);
      setToasterMessage(error.response.data.message);
      setUsd('');
    },
  });

  const handleInvest = () => {
    investNowMutate({ amount: usd, uid: plan.uid });
  };

  const ReturnType = {
    LIFETIME: 1,
    REPEAT: 2,
    getPlanDuration(plan: InvestmentPlan) {
      switch (plan.interest_return_type) {
        case this.LIFETIME:
          return 'LifeTime';
        case this.REPEAT:
          return `${plan.duration} ${plan.time}`;
        default:
          return '';
      }
    },
  };

  return (
    <>
      <TransparentCard>
        <BlurCircle className="top-[151px] left-[553px]" />
        <div className="flex gap-5">
          <div className="flex justify-between flex-col">
            <div>
              <p className="dark:text-white text-xl leading-[32px] mb-4">
                {plan.name}
              </p>
              <p className="dark:text-white-rgba-80 text-sm leading-[21px] mb-4">
                Interest Rate {plan.interest_rate}
              </p>
              <div
                onClick={() => handleOpen('term-policies')}
                className="flex items-center gap-1"
              >
                <InformationCricle />
                <p className="dark:text-white text-sm leading-[21px] underline cursor-pointer">
                  Terms & Policies
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <p className="dark:text-white font-medium text-2xl leading-9">
                {ReturnType.getPlanDuration(plan)}
              </p>
              <Button
                onClick={() => handleOpen('invest')}
                className="w-[150px] h-[38px]"
              >
                Invest Now
              </Button>
            </div>
          </div>
          <div className="flex-1 rounded-[25px] dark:bg-white-rgba-090 bg-green p-5">
            <p className="dark:text-white-rgba-80 text-black text-sm font-semibold leading-6 mb-5">
              Investment amount limit :{' '}
              {`${plan.type === 2 ? `${data?.currency_symbol}${plan.amount}` : `${data?.currency_symbol}${plan.minimum} - ${data?.currency_symbol}${plan.maximum}`}`}
            </p>
            <div className="space-y-[10px]">
              {plan.meta.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <TickIcon />
                  <p className="dark:text-white-rgba-80 text-sm leading-[21px]">
                    {item}
                  </p>
                </div>
              ))}
              <div className="flex items-center gap-1">
                <TickIcon />
                <p className="dark:text-white-rgba-80 text-sm leading-[21px]">
                  Total Return :{' '}
                  <span className="font-semibold">
                    {plan.total_investment_interest}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </TransparentCard>
      {isOpen && (
        <Modal size="sm" bg="default" isOpen={!!isOpen} onClose={handleClose}>
          <Modal.Body>
            <p className="text-center font-medium text-[20px] dark:text-white-rgba-90 text-black pb-[17px]">
              {isOpen === 'invest'
                ? `Start Investing with the ${plan.name} Plan`
                : 'Terms and policy'}
            </p>
            {isOpen === 'invest' ? (
              <>
                <div className="border-b border-white-rgba-10 pb-8">
                  <div className="space-y-5 w-full">
                    <InputField
                      type="number"
                      label="Amount"
                      value={usd}
                      onChange={handleUsdChange}
                      placeholder="Enter Amount"
                      trailing={
                        <p className="dark:text-black text-white text-[15px]">
                          {data?.currency_name}
                        </p>
                      }
                      trailingBg="dark:bg-white-rgba-90 bg-black"
                    />
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <Button loading={isPending} onClick={handleInvest}>
                    Submit
                  </Button>
                  <Button
                    onClick={handleClose}
                    type="dark"
                    className="font-normal border-none"
                  >
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <div>
                <p className="dark:text-white text-black text-center">
                  {plan.terms_policy}
                </p>
                <div className="flex justify-end items-center mt-5">
                  <Button
                    onClick={handleClose}
                    type="dark"
                    className="font-normal border-none"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
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

export default InvestmentSchemeCard;
