'use client';

import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import TopUpBalanceCard from './components/TopUpBalanceCard';
import BalanceIcon from '@/icons/BalanceIcon';
import UserTopUpCreateCard from './components/UserTopUpCreateCard';
import AccountTopUpCreateCard from './components/AccountTopUpCreateCard';
import { othersAccountTopUp, ownAccountTopUp } from '@/actions/wallet';
import Toaster from '@/components/Toaster';
import { useUser } from '@/components/Provider/UserProvider';
import { getValidStatus } from '@/utilits';
import { set } from 'zod';

const ownTopUpOptions = [
  {
    label: "Investment Wallet",
    value: "2",
  },
  {
    label: "Trade Wallet",
    value: "3",
  },
];


function TopUp() {
  const queryClient = useQueryClient();
  const userInfo = useUser();

  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [selectedOwnTopUpOption, setSelectedOwnTopUpOption] = useState(
    ownTopUpOptions[0]
  );
  const [selectedOtherUserOption, setSelectedOtherUserOption] =
    useState<string>('');
  const [ownAmount, setOwnAmount] = useState('');
  const [otherUserAmount, setOtherUserAmount] = useState('');
  const [uId, setUId] = useState('');

  const handleSelectedOwnTopupOption = (option: Option) => {
    setSelectedOwnTopUpOption(option);
  };
  const handleSelectedOtherUserOption = (option: Option) => {
    setSelectedOtherUserOption(option.value);
  };

  const handleOwnAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOwnAmount(e.target.value);
  };
  const handleOtherUserAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherUserAmount(e.target.value);
  };

  const handleUIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUId(e.target.value);
  };

  const {
    mutate: ownAccountTopUpMutate,
    isPending: isPendingOwnAccountTopUp,
    status,
  } = useMutation<
    any,
    ErrorResponse,
    {
      amount: string;
      account: string;
    }
  >({
    mutationFn: ownAccountTopUp,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setToasterOpen(true);
      setToasterMessage(data.message);
      setOwnAmount('');
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
      setOwnAmount('');
    },
  });

  const {
    mutate: otherAccountTopUpMutate,
    isPending: isPendingOtherAccountTopUp,
    status: otherAccountTopUpStatus,
  } = useMutation<
    any,
    ErrorResponse,
    {
      uuid: string;
      amount: string;
    }
  >({
    mutationFn: othersAccountTopUp,
    onSuccess: (data: any) => {
      setToasterOpen(true);
      setToasterMessage(data.message);
      setOtherUserAmount('');
      setUId('');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      setToasterOpen(true);
      setToasterMessage(error.response.data.message);
      setOtherUserAmount('');
      setUId('');
    },
  });

  const handleOwnAcountTopUpSave = () => {
    ownAccountTopUpMutate({
      amount: ownAmount,
      account: selectedOwnTopUpOption.value,
    });
  };
  const handleOtherAccountTopUpSave = () => {
    otherAccountTopUpMutate({
      uuid: uId,
      amount: otherUserAmount,
    });
  };
  const topUpBalance = [
    {
      title: 'Primary Balance',
      icon: <BalanceIcon />,
      balance: userInfo.wallet.primary_balance,
    },
    {
      title: 'Investment Balance',
      icon: <BalanceIcon />,
      balance: userInfo.wallet.investment_balance,
    },
    {
      title: 'Trade Balance',
      icon: <BalanceIcon />,
      balance: userInfo.wallet.trade_balance,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        {topUpBalance.map((balance, index) => (
          <div className="flex-1" key={index}>
            <TopUpBalanceCard
              title={balance.title}
              icon={balance.icon}
              balance={balance.balance}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <AccountTopUpCreateCard
          amount={ownAmount}
          selectedOptions={selectedOwnTopUpOption}
          options={ownTopUpOptions}
          onSelect={handleSelectedOwnTopupOption}
          onChange={handleOwnAmountChange}
          onSave={handleOwnAcountTopUpSave}
          isSaveLoading={isPendingOwnAccountTopUp}
        />
        <UserTopUpCreateCard
          value={otherUserAmount}
          uId={uId}
          onChangeUId={handleUIdChange}
          onChange={handleOtherUserAmountChange}
          onSave={handleOtherAccountTopUpSave}
          isSaveLoading={isPendingOtherAccountTopUp}
        />
      </div>
      <Toaster
        message={toasterMessage}
        type={getValidStatus(status, otherAccountTopUpStatus)}
        position="top-center"
        isOpen={toasterOpen}
        onClose={() => setToasterOpen(false)}
      />
    </div>
  );
}

export default TopUp;
