'use client';

import { useMemo, useState } from 'react';

import CardTitle from '@/components/CardTitle';
import InputField from '@/components/InputField';
import DropdownMenu from '@/components/DropdownMenu';
import Button from '@/components/Button';
import { label } from 'framer-motion/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tradeRiseFall } from '@/actions/tradesview';
import Toaster from '@/components/Toaster';
import useGlobalSettings from '@/hooks/useGlobalSettings';

interface Props {
  parameters: Parameter[];
  crypto: CryptoView;
  type: string;
}

function calculateWithPercentage(amount: number, percentage = 0) {
  const calculatedPercentage = (percentage / 100) * amount;
  return amount + calculatedPercentage;
}

function RiseFall({ parameters, crypto, type }: Props) {
  const queryClient = useQueryClient();
  const { data: globalSettings } = useGlobalSettings();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [volume, setVolume] = useState('');
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  }>();

  const timeOptions = useMemo(() => {
    return [
      { label: 'Select Expiration Time', value: '' },
      ...parameters.map((parameter) => ({
        label: `Time: ${parameter.time} ${parameter.unit}`,
        value: parameter.id,
      })),
    ];
  }, [parameters]);

  const handleOptionChange = (selectOption: {
    value: string;
    label: string;
  }) => {
    const selectedOption = timeOptions?.find(
      (option) => option.value === selectOption.value
    );
    setSelectedOption(selectedOption);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const {
    mutate: tradeRiseFallMutation,
    isPending: tradeRiseFallPending,
    status: tradeRiseFallStatus,
  } = useMutation({
    mutationFn: (volume: string) =>
      tradeRiseFall(
        {
          amount,
          parameter_id: selectedOption?.value ?? '',
          volume: volume,
          type: type === 'trade' ? '1' : '0',
        },
        crypto.id
      ),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ['trades-view'],
      });
      setToasterOpen(true);
      setToasterMessage(data.message);
      setAmount('');
      setVolume('');
      setSelectedOption(timeOptions[0]);
    },
    onError: (error: any) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });
  const handleRiseFall = (volume: string) => {
    setVolume(volume);
    tradeRiseFallMutation(volume);
  };
  const total = calculateWithPercentage(
    Number(amount),
    globalSettings?.commissions_charge?.binary_trade_commissions
  );
  return (
    <>
      <div className="border dark:border-[#313131] border-[#E4E4E2] rounded-[30px] md:max-w-[400px] w-full dark:bg-[#222222] bg-white overflow-hidden">
        <div className="p-5 border-b dark:border-[#313131] border-[#E4E4E2]">
          <CardTitle title="Bullish / Bearish" />
        </div>
        <div className="p-5 space-y-2">
          <InputField
            label="Amount"
            value={amount}
            placeholder="Enter Amount"
            onChange={handleChangeAmount}
            type="number"
            min={0}
            onWheel={(e) => e.currentTarget.blur()}
          />
          <div>
            <p className="text-[13px] text-white-rgba-90 mb-2">Expiry Time</p>
            <div className="w-full">
              <DropdownMenu
                options={timeOptions}
                onChange={handleOptionChange}
                buttonText={selectedOption?.label || timeOptions[0].label}
                buttonClassName="w-full h-[42px]"
              />
            </div>
          </div>
        </div>
        <div className="px-5 pb-5 space-y-[26px]">
          <div className=" dark:bg-white-rgba-10 bg-green rounded-[20px] flex flex-col  justify-center items-center h-[227px]">
            <p className="text-[32px] font-medium dark:text-primary text-black">
              +{total} / {globalSettings?.commissions_charge?.binary_trade_commissions}%
            </p>
            <p className="text-[25px] dark:text-white-rgba-80 text-black">
              Profit Margins
            </p>
          </div>
          <div>
            <Button
              loading={volume === '1' && tradeRiseFallPending}
              onClick={() => handleRiseFall('1')}
              className="w-full"
            >
              High
            </Button>
            <Button
              loading={volume === '2' && tradeRiseFallPending}
              type="danger"
              onClick={() => handleRiseFall('2')}
              className="w-full mt-2"
            >
              Low
            </Button>
          </div>
        </div>
      </div>
      <Toaster
        message={toasterMessage}
        type={tradeRiseFallStatus as 'success' | 'error'}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </>
  );
}

export default RiseFall;
