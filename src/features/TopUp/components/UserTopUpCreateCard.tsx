import { ChangeEvent, useEffect, useState } from 'react';

import BlurCircle from '@/components/BlurCircle';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import SearchableDropdown from '@/components/SearchableDropdown';
import TransparentCard from '@/components/TransparentCard';
import VerticalLine from '@/components/VerticalLine';
import { useQuery } from '@tanstack/react-query';
import { fetchWalletUser } from '@/actions/wallet';
import useDebounce from '@/hooks/useDebounce';

interface TopUpCreateCardProps {
  isSaveLoading?: boolean;
  value: string;
  uId: string;
  onChangeUId: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

function UserTopUpCreateCard({
  value,
  isSaveLoading,
  uId,
  onChangeUId,
  onChange,
  onSave,
}: TopUpCreateCardProps) {
  const [searchOtherUser, setSearchOtherUser] = useState('');
  const searchUser = useDebounce(searchOtherUser, 300);
  const handleOtherUserSearchChange = (value: string) => {
    setSearchOtherUser(value);
  };
  const { data, isLoading, isSuccess } = useQuery<WalletUserResponse>({
    queryKey: ['walletUser', searchUser],
    queryFn: () =>
      fetchWalletUser({
        email: searchUser,
      }),
  });

  useEffect(() => {
    if (isSuccess && data) {
      const userOptions = data.map((user) => {
        return {
          label: user.email,
          value: user.id,
        };
      });
    }
  }, [data, isSuccess]);

  return (
    <TransparentCard>
      <BlurCircle className="h-[100px] w-[100px] top-[-10px] left-[169px]" />
      <div className="flex items-center gap-[10px] mb-[24px]">
        <VerticalLine height="40px" width="3px" />
        <p>Transfer the balance from your primary account to other users.</p>
      </div>
      <div className="space-y-6">
        {/* <SearchableDropdown
          label="User (Check the dashboard for UID if not found.)"
          options={othersUserOptions}
          searchTerm={searchOtherUser}
          onSearchChange={handleOtherUserSearchChange}
          onSelect={onSelect}
          searchPlaceholder="Search for an user..."
          containerClass="mb-4"
          loading={isLoading || !isSuccess}
        /> */}
        <InputField
          label="User (Check the dashboard for UID if not found.)"
          value={uId}
          onChange={onChangeUId}
          placeholder="Enter UID"
          className="dark:bg-white-rgba-13 backdrop-blur-[12.5px] h-[46px] dark:text-white"
        />
        <InputField
          label="Amount"
          value={value}
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

export default UserTopUpCreateCard;
