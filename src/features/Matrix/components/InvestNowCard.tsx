'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import TickIcon from '@/icons/TickIcon';
import { formatToOneDecimal } from '@/utilits';
import { createMatrix } from '@/actions/matrix';
import Toaster from '@/components/Toaster';
import useGlobalSettings from '@/hooks/useGlobalSettings';

interface InvestNowCardProps {
  plan: MatrixPlan;
}

function InvestNowCard({ plan }: InvestNowCardProps) {
  const queryClient = useQueryClient();
  const { data } = useGlobalSettings();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const {
    mutate: matrixInvestmentMute,
    isPending,
    status,
  } = useMutation({
    mutationFn: createMatrix,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['matrix'] });
      setToasterOpen(true);
      setToasterMessage(data.message);
      setIsOpen(false);
    },
    onError: (error: any) => {
      setIsOpen(false);
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const handleInvest = () => {
    matrixInvestmentMute({ uid: plan.uid });
  };

  return (
    <>
      <div className="relative rounded-[30px] border dark:border-[#313131] border-[#E4E4E2] dark:bg-white/10 bg-white backdrop-blur-[17.5px] w-full p-5 space-y-4 overflow-hidden">
        <div className="absolute w-[129px] h-[136px] bg-primary blur-[140px] top-[21px] left-[148px] dark:block hidden"></div>
        <div className="flex justify-between items-center">
          <p className="dark:text-primary text-black text-[27px] font-semibold leading-[40.5px]">
            {data?.currency_symbol}
            {plan.amount}
          </p>
          <Button className="z-10" onClick={handleOpen}>
            Start Investing Now
          </Button>
        </div>

        <hr className="bg-[#FFFFFF12]" />
        <div>
          <p className="dark:text-[#fff] text-[20px]">{plan.name}</p>
          <div className="flex mt-[18.5px]">
            <div className="border-l-2 border-[#ECAC31] pl-[10px]">
              <p className="text-[14px] font-medium leading-[160%] dark:text-[#FFF] text-black">
                Straightforward Referral Reward:{' '}
                <span className="dark:text-primary">
                  {data?.currency_symbol}
                  {plan.referral_reward}
                </span>
              </p>
              <p className="text-[14px] font-medium leading-[160%] dark:text-[#FFF] text-black">
                Aggregate Level Commission:{' '}
                <span className="dark:text-primary">
                  {data?.currency_symbol}
                  {plan.aggregate_level_commission}
                </span>
              </p>
              <p className="text-[14px] font-medium leading-[160%] dark:text-[#FFF] text-black">
                Get back 
                <span className="dark:text-primary">{plan.get_back}% </span> of
                what you invested
              </p>
            </div>
          </div>
          <div className="w-full p-5 rounded-[10px] dark:bg-[#FFFFFF1A] bg-green backdrop-blur-[12.5px] mt-5">
            <p className="dark:text-[#FFFFFFCC] text-base leading-6 mb-5">
              What’s included
            </p>
            <div className="space-y-[10px]">
              {plan.level.map((level, index) => (
                <div key={index} className="flex items-center gap-[10px]">
                  <div className="min-h-[15px] min-w-[15px] flex items-center justify-center bg-primary rounded-full">
                    <TickIcon />
                  </div>
                  <div>
                    <span className="flex items-center gap-2">
                      {level.level}
                      <svg
                        width="25"
                        height="8"
                        viewBox="0 0 25 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 3.51515H0.5V4.51515H1V3.51515ZM24.5 4.51515C24.7761 4.51515 25 4.29129 25 4.01515C25 3.73901 24.7761 3.51515 24.5 3.51515V4.51515ZM21.8399 1V0.5H20.8399V1H21.8399ZM24.2374 4.42838C24.4824 4.55586 24.7843 4.46063 24.9118 4.21567C25.0393 3.97072 24.944 3.6688 24.6991 3.54132L24.2374 4.42838ZM20.8399 7V7.5H21.8399V7H20.8399ZM1 4.51515H24.4682V3.51515H1V4.51515ZM24.4682 4.51515H24.5V3.51515H24.4682V4.51515ZM20.8399 1C20.8399 1.52093 21.1318 1.99264 21.4485 2.36349C21.7769 2.74808 22.2019 3.10472 22.6074 3.40367C23.016 3.70496 23.4221 3.96015 23.7245 4.13939C23.8762 4.2293 24.0029 4.30077 24.0924 4.35009C24.1371 4.37477 24.1726 4.39393 24.1973 4.40713C24.2096 4.41373 24.2193 4.41883 24.226 4.4224C24.2294 4.42418 24.232 4.42557 24.234 4.42657C24.2349 4.42707 24.2357 4.42747 24.2363 4.42777C24.2365 4.42792 24.2368 4.42805 24.237 4.42815C24.2371 4.4282 24.2372 4.42826 24.2372 4.42828C24.2373 4.42834 24.2374 4.42838 24.4682 3.98485C24.6991 3.54132 24.6991 3.54135 24.6992 3.54137C24.6992 3.54138 24.6992 3.5414 24.6992 3.5414C24.6992 3.5414 24.6992 3.54138 24.6991 3.54133C24.6989 3.54124 24.6985 3.54104 24.698 3.54076C24.6969 3.54018 24.6951 3.53922 24.6925 3.53788C24.6874 3.5352 24.6795 3.531 24.6689 3.52534C24.6478 3.51402 24.616 3.49689 24.5753 3.47439C24.4936 3.42938 24.376 3.36307 24.2344 3.27914C23.9502 3.11073 23.5742 2.87412 23.2008 2.59879C22.8242 2.32113 22.4671 2.01636 22.209 1.71409C21.9391 1.39808 21.8399 1.15748 21.8399 1H20.8399ZM24.4682 4.01515C24.2884 3.54862 24.2882 3.54867 24.2881 3.54872C24.288 3.54875 24.2879 3.54881 24.2878 3.54885C24.2875 3.54895 24.2872 3.54906 24.2869 3.54919C24.2862 3.54946 24.2853 3.5498 24.2843 3.55021C24.2821 3.55104 24.2793 3.55216 24.2757 3.55358C24.2685 3.55642 24.2584 3.56044 24.2456 3.56561C24.22 3.57596 24.1836 3.59097 24.1378 3.61047C24.0463 3.64946 23.9172 3.70659 23.7629 3.78068C23.4557 3.92825 23.0424 4.14605 22.6258 4.42511C22.2121 4.70225 21.7764 5.05214 21.4397 5.46908C21.1029 5.88622 20.8399 6.40291 20.8399 7H21.8399C21.8399 6.7077 21.968 6.40659 22.2177 6.09731C22.4676 5.78782 22.814 5.50267 23.1823 5.25595C23.5478 5.01115 23.9166 4.81626 24.1959 4.6821C24.3349 4.61533 24.4502 4.56435 24.5298 4.53042C24.5696 4.51348 24.6003 4.50083 24.6206 4.49265C24.6307 4.48856 24.6382 4.48558 24.6428 4.48375C24.6451 4.48283 24.6468 4.4822 24.6476 4.48185C24.6481 4.48168 24.6483 4.48158 24.6484 4.48155C24.6485 4.48154 24.6484 4.48154 24.6484 4.48156C24.6484 4.48157 24.6483 4.4816 24.6483 4.48161C24.6482 4.48164 24.6481 4.48168 24.4682 4.01515Z"
                          fill="#FFFAF3"
                        />
                      </svg>
                      {formatToOneDecimal(level.amount, 0)}x{level.matrix} ={' '}
                      {data?.currency_symbol}
                      {formatToOneDecimal(level.total, 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal size="sm" bg="default" isOpen={isOpen} onClose={handleOpen}>
          <Modal.Body>
            <p className="text-center font-medium text-[20px] text-black dark:text-white-rgba-90 border-b border-[#0000001A] dark:border-white-rgba-10 pb-5">
              Join {plan.name} Matrix Scheme
            </p>
            <div className="mt-5 border-b dark:border-white-rgba-10 border-[#0000001A] pb-8">
              <p className="font-medium text-[18px] leading-7 dark:text-white-rgba-90 text-black">
                Are you sure want to enroll in this matrix scheme?
              </p>
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

export default InvestNowCard;
