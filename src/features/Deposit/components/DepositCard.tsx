'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Modal from '@/components/Modal';
import VerticalLine from '@/components/VerticalLine';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import DropdownMenu from '@/components/DropdownMenu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPaymentDeposit, createTraditionalDeposit } from '@/actions/deposit';
import Toaster from '@/components/Toaster';
import { captilizeFirstLetter, cn, getValidStatus } from '@/utilits';
import AutomaticPayment from '@/features/PaymentGateway/AutomaticPayment';

interface Field {
  field_name: string;
  field_type: string;
  field_label: string;
}
interface DepositCardProps {
  data: PaymentGateway;
}

const Options = [
  {
    value: '1',
    label: 'Primary Wallet',
  },
  {
    value: '2',
    label: 'Investment Wallet',
  },
  {
    value: '3',
    label: 'Trade Wallet',
  },
];

function DepositCard({ data }: DepositCardProps) {
  const queryClient = useQueryClient();
  const { data: globalSettings } = useGlobalSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [inputData, setInputData] = useState<Record<string, any>>({});
  const [selectedOption, setSelectedOption] = useState<Option>(Options[0]);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [paymentInfo, setPaymentInfo] = useState<Record<string, any>>({});

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setPaymentInfo({});
    setAmount('');
  };
  const handleOptionChange = (selectOption: {
    value: string;
    label: string;
  }) => {
    const selectedOption = Options.find(
      (option) => option.value === selectOption.value
    );
    setSelectedOption(selectedOption || Options[0]);
  };
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleChange = (fieldName: string, value: any) => {
    setInputData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const renderField = (field: Field) => {
    const { field_name, field_type, field_label } = field;

    switch (field_type) {
      case 'text':
        return (
          <div key={field_name} className="form-group mb-4">
            <label
              htmlFor={field_name}
              className="block text-base mb-[10px] text-black dark:text-white-rgba-90"
            >
              {captilizeFirstLetter(field_label)}
            </label>
            <input
              type="text"
              id={field_name}
              className="w-full rounded-full dark:bg-[#000] dark:placeholder:text-[#ACB5BB] placeholder:text-[#00000075] placeholder:text-[13px] text-black dark:text-[#ACB5BB] text-sm border dark:border-[#313131] border-[#E4E4E2] px-3  py-2 transition duration-300 ease focus:outline-none focus:shadow-none h-[46px] bg-green"
              value={inputData[field_name] || ''}
              onChange={(e) => handleChange(field_name, e.target.value)}
              placeholder={`Enter ${field_label}`}
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={field_name} className="form-group mb-4">
            <label
              htmlFor={field_name}
              className="block text-base mb-[10px] text-black dark:text-white-rgba-90"
            >
              {captilizeFirstLetter(field_label)}
            </label>
            <textarea
              id={field_name}
              className="w-full rounded-md   dark:bg-[#000] dark:placeholder:text-[#ACB5BB] placeholder:text-[#00000075] placeholder:text-[13px] text-black dark:text-[#ACB5BB] text-sm border dark:border-[#313131] border-[#E4E4E2] px-3  py-2 transition duration-300 ease focus:outline-none focus:shadow-none h-[100px] bg-green"
              value={inputData[field_name] || ''}
              onChange={(e) => handleChange(field_name, e.target.value)}
              placeholder={`Enter ${field_label}`}
            />
          </div>
        );
      case 'file':
        return (
          <div key={field_name} className="form-group mb-4">
            <label
              htmlFor={field_name}
              className="block text-base mb-[10px] text-black dark:text-white-rgba-90"
            >
              {captilizeFirstLetter(field_label)}
            </label>
            <input
              type="file"
              id={field_name}
              className="w-full rounded-md dark:bg-[#000] dark:placeholder:text-[#ACB5BB] placeholder:text-[#00000075] placeholder:text-[13px] text-black dark:text-[#ACB5BB] text-sm border dark:border-[#313131] border-[#E4E4E2] px-3  py-2 transition duration-300 ease focus:outline-none focus:shadow-none h-[46px] bg-green"
              onChange={(e) => {
                handleChange(field_name, e.target.files?.[0]);
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const {
    mutate: traditionalDepositMutete,
    isPending: isTraditionalDepositPending,
    status: traditionalDepositStatus,
  } = useMutation({
    mutationFn: createTraditionalDeposit,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['deposit'] });
      setToasterMessage(data.message);
      setToasterOpen(true);
      setIsOpen(false);
      setAmount('');
      setPaymentInfo({});
      setSelectedOption(Options[0]);
      setInputData({});
    },
    onError: (error: any) => {
      setIsOpen(false);
      setAmount('');
      setPaymentInfo({});
      setSelectedOption(Options[0]);
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const { mutate: paymentDepositMutete, isPending: isSetPaymentInfoPending } =
    useMutation({
      mutationFn: createPaymentDeposit,
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ["deposit"] });
        setToasterMessage(data.message);
        setToasterOpen(true);
        setIsOpen(false);
        setAmount("");
        setPaymentInfo({});
        setSelectedOption(Options[0]);
        setInputData({});
      },
      onError: (error: any) => {
        setIsOpen(false);
        setAmount("");
        setPaymentInfo({});
        setSelectedOption(Options[0]);
        setToasterOpen(true);
        setToasterMessage(error.response.data.message);
      },
    });

  const handleSubmit = () => {
    const payload = {
      amount: Number(amount),
      wallet: selectedOption.value,
      code: data.code,
      ...(data.type === 2 && data.parameters && inputData),
    };

    if (data.type === 2) {
      traditionalDepositMutete(payload);
    }
    if (data.type === 1 && data.name !== 'Stripe') {
      paymentDepositMutete(payload);
    }
    if (data.type === 1 && data.name === 'Stripe') {
      setPaymentInfo(payload);
    }
  };

  return (
    <div>
      <div className="relative border dark:border-[#313131] border-[#E4E4E2] dark:bg-white/10 bg-white backdrop-blur-[17.5px] w-full p-5 overflow-hidden rounded-[30px]">
        <div className="absolute w-[100px] h-[100px] bg-primary blur-[140px] top-[-10px] left-[169px] dark:block hidden"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-[10px]">
            <VerticalLine height="20px" width="2px" />
            <p className="text-[16px] font-medium dark:text-white-rgba-80 text-black leading-6">
              {data.name}
            </p>
          </div>

          <Image
            src={data.file}
            alt={data.name}
            width={40}
            height={40}
            className="h-[40px] w-[40px] object-contain"
          />
        </div>
        <div className="backdrop-blur-[12.5px] p-[10px] rounded-[10px] bg-green dark:bg-white-rgba-090 space-y-2 mb-3">
          <p className="text-center text-sm leading-[19.5px] dark:text-white-rgba-80">
            Minimum : {globalSettings?.currency_symbol}
            {data.minimum}
          </p>
          <p className="text-center text-sm leading-[19.5px] dark:text-white-rgba-80">
            Maximum : {globalSettings?.currency_symbol}
            {data.maximum}
          </p>
        </div>
        <Button onClick={handleOpen} className="w-full">
          Deposit Now
        </Button>
      </div>

      {isOpen && (
        <Modal size="sm" bg="default" isOpen={isOpen} onClose={handleClose}>
          <Modal.Body>
            <p className="text-center font-medium text-[20px] dark:text-white-rgba-90 text-black pb-[17px]">
              Deposit with {data.name} Now
            </p>
            <p className="font-medium text-base dark:text-white-rgba-90 text-black pb-[17px] break-all" dangerouslySetInnerHTML={
              { __html: data.details || '' }
            }>
            </p>
            <div
              className={cn("border-white-rgba-10 pb-8", {
                "border-b": !paymentInfo?.amount,
              })}
            >
              <div className="space-y-5 w-full">
                {!paymentInfo?.amount && (
                  <>
                    <InputField
                      type="number"
                      label={`Amount (${globalSettings?.currency_symbol}${data.minimum} - ${globalSettings?.currency_symbol}${data.maximum})`}
                      value={amount}
                      onChange={handleChangeAmount}
                      placeholder="Enter Amount"
                      trailing={
                        <p className="dark:text-black text-white text-[15px]">
                          {globalSettings?.currency_name}
                        </p>
                      }
                      trailingBg="dark:bg-white-rgba-90 bg-black"
                      onWheel={(e) => e.currentTarget.blur()}
                      min={0}
                    />
                    <div>
                      <p className="dark:text-white text-black mb-[8px]">
                        Wallet
                      </p>
                      <DropdownMenu
                        options={Options}
                        onChange={handleOptionChange}
                        buttonText={selectedOption?.label}
                        buttonClassName="w-full h-[42px]"
                      />
                    </div>
                  </>
                )}
                {data.type === 1 && paymentInfo?.amount ? (
                  <AutomaticPayment
                    code={data.code}
                    amount={paymentInfo?.amount}
                  />
                ) : null}
                {data.type === 2 &&
                  data.parameters &&
                  Object?.values(data?.parameters).map(renderField)}
              </div>
            </div>
            {!paymentInfo.amount && (
              <div className="mt-5 flex items-center gap-3">
                <Button
                  onClick={handleSubmit}
                  loading={isTraditionalDepositPending}
                  actionType="button"
                >
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
            )}
          </Modal.Body>
        </Modal>
      )}
      <Toaster
        message={toasterMessage}
        type={getValidStatus(traditionalDepositStatus)}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </div>
  );
}

export default DepositCard;
