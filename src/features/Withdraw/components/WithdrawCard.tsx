'use client';

import { FormEvent, useState } from 'react';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Modal from '@/components/Modal';
import VerticalLine from '@/components/VerticalLine';
import BankTransferIcon from '@/icons/BankTransferIcon';
import WesternUnionIcon from '@/icons/WesternUnionIcon';
import CriptonIcon from '@/icons/CriptonIcon';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWithdraw } from '@/actions/withdraw';
import Toaster from '@/components/Toaster';
import { set } from 'zod';

interface Field {
  field_name: string;
  field_type: string;
  field_label: string;
}
interface WithdrawCardProps {
  data: WithdrawGateway;
}

function WithdrawCard({ data }: WithdrawCardProps) {
  const queryClient = useQueryClient();

  const { data: globalSettings } = useGlobalSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [amount, setAmount] = useState('');
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const [inputData, setInputData] = useState<Record<string, any>>({});

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
              {field_label}
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
              {field_label}
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
              {field_label}
            </label>
            <input
              type="file"
              id={field_name}
              className="w-full rounded-md dark:bg-[#000] dark:placeholder:text-[#ACB5BB] placeholder:text-[#00000075] placeholder:text-[13px] text-black dark:text-[#ACB5BB] text-sm border dark:border-[#313131] border-[#E4E4E2] px-3  py-2 transition duration-300 ease focus:outline-none focus:shadow-none h-[46px] bg-green"
              onChange={(e) => handleChange(field_name, e.target.files?.[0])}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const {
    mutate: onWithdraw,
    isPending,
    status,
  } = useMutation({
    mutationFn: createWithdraw,
    onSuccess: (data: any) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ['withdraw'] });
      setIsOpen(false);
      setAmount('');
      setInputData({});
    },
    onError: (error: any) => {
      setIsOpen(false);
      setAmount('');
      setInputData({});
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(inputData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('amount', amount);
    formData.append('id', data.id.toString());
    onWithdraw(formData);
  };
  return (
    <div>
      <div className="relative border dark:border-[#313131] border-[#E4E4E2] bg-white/10 backdrop-blur-[17.5px] w-full p-5 overflow-hidden rounded-[30px]">
        <div className="absolute w-[100px] h-[100px] bg-primary blur-[140px] top-[-10px] left-[169px] dark:block hidden"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-[10px]">
            <VerticalLine height="20px" width="2px" />
            <p className="text-[16px] font-medium dark:text-white-rgba-80 leading-6">
              {data.name}
            </p>
          </div>
          <div>
            {data.id === 1 ? (
              <BankTransferIcon />
            ) : data.id === 2 ? (
              <WesternUnionIcon />
            ) : (
              <CriptonIcon />
            )}
          </div>
        </div>

        <div className="backdrop-blur-[12.5px] p-[10px] rounded-[10px] dark:bg-white-rgba-090 bg-green space-y-2 mb-3">
          <p className="text-center text-sm leading-[19.5px] dark:text-white-rgba-80">
            Minimum Limit : {globalSettings?.currency_symbol}
            {data.min_limit}
          </p>
          <p className="text-center text-sm leading-[19.5px] dark:text-white-rgba-80">
            Maximum Limit : {globalSettings?.currency_symbol}
            {data.max_limit}
          </p>
        </div>
        <Button onClick={handleOpen} className="w-full">
          Withdraw
        </Button>
      </div>

      {isOpen && (
        <Modal size="sm" bg="default" isOpen={isOpen} onClose={handleOpen}>
          <Modal.Body>
            <p className="text-center font-medium text-[20px] dark:text-white-rgba-90  pb-[17px]">
              Withdraw Now
            </p>
            <form onSubmit={handleSubmit}>
              <div className="border-b border-white-rgba-10 pb-8">
                <div className="space-y-5 w-full">
                  <InputField
                    label={`Amount (${globalSettings?.currency_symbol}${data.min_limit}-${globalSettings?.currency_symbol}${data.max_limit})`}
                    value={amount}
                    onChange={handleAmount}
                    placeholder="Enter Amount"
                    trailing={
                      <p className="text-black text-[15px]">
                        {globalSettings?.currency_name}
                      </p>
                    }
                    trailingBg="bg-white-rgba-90"
                    type="number"
                  />
                  {Object?.values(data?.parameters).map(renderField)}
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <Button loading={isPending} actionType="submit">
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
            </form>
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
    </div>
  );
}

export default WithdrawCard;
