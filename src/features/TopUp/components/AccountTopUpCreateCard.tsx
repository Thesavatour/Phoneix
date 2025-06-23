import { ChangeEvent } from 'react';

import BlurCircle from '@/components/BlurCircle';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import TransparentCard from '@/components/TransparentCard';
import VerticalLine from '@/components/VerticalLine';
import DropdownMenu from '@/components/DropdownMenu';

interface TopUpCreateCardProps {
  isSaveLoading: boolean;
  amount: string;
  options: Option[];
  selectedOptions: Option;
  onSelect: (option: Option) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

function AccountTopUpCreateCard({
  isSaveLoading,
  amount,
  selectedOptions,
  options,
  onSelect,
  onChange,
  onSave,
}: TopUpCreateCardProps) {
  return (
    <TransparentCard>
      <BlurCircle className="h-[100px] w-[100px] top-[-10px] left-[169px]" />
      <div className="flex items-center gap-[10px] mb-[24px]">
        <VerticalLine height="40px" width="3px" />
        <p>
          Transfer the balance from your trade and investment account to your
          primary account, and subsequently initiate a withdrawal of your
          balance.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-white mb-[10px]">Account</p>
          <DropdownMenu
            options={options}
            onChange={onSelect}
            buttonText={selectedOptions.label}
            buttonClassName="h-[46px] dark:bg-white-rgba-13 backdrop-blur-[12.5px] dark:text-white"
          />
        </div>
        <InputField
          label="Amount"
          value={amount}
          onChange={onChange}
          placeholder="Enter amount"
          className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] h-[46px] dark:text-white"
        />
        <Button loading={isSaveLoading} onClick={onSave}>
          Save
        </Button>
      </div>
    </TransparentCard>
  );
}

export default AccountTopUpCreateCard;
