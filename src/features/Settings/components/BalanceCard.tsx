import useGlobalSettings from '@/hooks/useGlobalSettings';

interface BalanceCardProps {
  title: string;
  balance: string;
}

function BalanceCard({ title, balance }: BalanceCardProps) {
  const { data: globalSettings } = useGlobalSettings();
  return (
    <div className="border dark:border-[#2C2C30] border-[#0000001A] p-4 backdrop-blur-[12.5px] bg-green dark:bg-white-rgba-10 py-4 pl-4 min-w-[263px] rounded-2xl">
      <p className="text-black dark:text-[#ACB5BB] mb-4">{title}</p>
      <div className="flex items-center gap-2">
        <p className="text-[28px] leading-[42px] text-black dark:text-white">
          {globalSettings?.currency_symbol}
          {balance ?? 0}
        </p>
      </div>
    </div>
  );
}

export default BalanceCard;
