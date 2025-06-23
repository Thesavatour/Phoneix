import useGlobalSettings from '@/hooks/useGlobalSettings';
import TickIcon from '@/icons/TickIcon';

interface RewardBadgesCardProps {
  data: InvestmentUserReward;
}

function RewardBadgesCard({ data }: RewardBadgesCardProps) {
  const { data: globalSettings } = useGlobalSettings();
  return (
    <div>
      <div className="relative border dark:border-[#313131] border-[#E4E4E2] dark:bg-white/10 bg-white backdrop-blur-[17.5px] w-full p-5 overflow-hidden rounded-[30px]  ">
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="w-[150px] dark:bg-primary bg-black rounded-b-[12px] text-center dark:text-black text-white  py-[7.5px]">
            Reward {globalSettings?.currency_symbol}
            {data.reward}
          </div>
        </div>
        <div className="flex-col flex justify-center items-center mt-[28px] mb-5">
          <p className="text-[20px] leading-[30px] font-medium dark:text-white">
            {data.level}
          </p>
          <p className="mt-1 dark:text-[#ACB5BB] text-base leading-6">
            {data.name}
          </p>
        </div>

        <div className="absolute w-[100px] h-[100px] bg-primary blur-[140px] top-[268px] left-[119px] dark:block hidden"></div>
        <div className="backdrop-blur-[12.5px] p-[10px] rounded-[10px] bg-green dark:bg-white-rgba-090 space-y-2 mb-5">
          <div className="space-y-[10px]">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <TickIcon />
                <p className="text-center text-sm leading-[21px] dark:text-white-rgba-80">
                  Minimum Invest
                </p>
              </div>
              <p className="text-center text-sm leading-[21px] dark:text-white-rgba-80">
                {globalSettings?.currency_symbol}
                {data.invest}
              </p>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <TickIcon />
                <p className="text-center text-sm leading-[21px] dark:text-white-rgba-80">
                  Minimum Team Invest
                </p>
              </div>
              <p className="text-center text-sm leading-[21px] dark:text-white-rgba-80">
                {globalSettings?.currency_symbol}
                {data.team_invest}
              </p>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <TickIcon />
                <p className="text-center text-sm leading-[21px] dark:text-white-rgba-80">
                  Minimum Deposit
                </p>
              </div>
              <p className="text-center text-sm leading-[21px] dark:text-white-rgba-80">
                {globalSettings?.currency_symbol}
                {data.deposit}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <p className="text-[15px] font-medium underline dark:text-white leading-[22px]">
            Minimum Investment Referral {data.minimum_referral}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RewardBadgesCard;
