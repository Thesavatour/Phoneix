import useGlobalSettings from '@/hooks/useGlobalSettings';

interface Props {
  name: string;
  value: string;
}
function TotalInvestCard({ name, value }: Props) {
  const { data } = useGlobalSettings();
  return (
    <div className="h-[125px] px-4 py-[26px] dark:bg-white-rgba-10 bg-green rounded-[25px] overflow-hidden backdrop-blur-[17.5px] border border-[#E4E4E2] dark:border-none">
      <p className="text-[15px] leading-[22px] dark:text-white-rgba-90">
        {name}
      </p>
      <div className="flex items-center gap-1">
        <p className="text-[26px] leading-[39px] dark:text-white">
          {data?.currency_symbol}
          {value}
        </p>
      </div>
    </div>
  );
}

export default TotalInvestCard;
