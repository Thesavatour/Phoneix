import useGlobalSettings from '@/hooks/useGlobalSettings';
import Image from 'next/image';

interface MarketCardProps {
  data: CryptoCurrency;
}

function MarketCard({ data }: MarketCardProps) {
  const { data: globalSettings } = useGlobalSettings();
  return (
    <div className="flex justify-between items-center py-[14px] border-b dark:border-[#313131] border-[#E4E4E2]">
      <div className="flex items-center gap-3">
        <Image
          src={data.file}
          alt="menu-card-bg"
          width={30}
          height={30}
          className="w-[30px] h-[30px] rounded-full"
        />
        <div>
          <p className="text-sm font-medium leading-6 dark:text-white">
            {data.name}
          </p>
          <p className="text-sm dark:text-[#D6D6D6]">
            {globalSettings?.currency_symbol}
            {data.price}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium dark:text-white text-right">
          {data.market_cap}
        </p>
        <p className="text-sm text-[#5ED5A8] text-right">+{data.daily_high}</p>
      </div>
    </div>
  );
}

export default MarketCard;
