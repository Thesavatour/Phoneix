import BlurCircle from '@/components/BlurCircle';
import TransparentCard from '@/components/TransparentCard';
import InvestNowButton from './InvestNowButton';
import TotalInvestCard from './TotalInvestCard';

interface InvestmentStatsCardProps {
  data: InvestmentStatistics;
}

function InvestmentStatsCard({ data }: InvestmentStatsCardProps) {
  const totalInvest = [
    {
      name: 'Total Investment',
      value: data.today_invest,
    },
    {
      name: 'Total Profits',
      value: data.profit,
    },
    {
      name: 'Running Invest',
      value: data.running,
    },
    {
      name: 'Closed Invest',
      value: data.closed,
    },
  ];
  return (
    <TransparentCard className="w-full">
      <BlurCircle className="left-[-10px] top-[-11px] h-[119px] w-[127px] -z-10 dark:block hidden" />
      <BlurCircle className="right-[-10px] top-[-30px] h-[81px] w-[141px] -z-10 dark:block hidden" />
      <p className="dark:text-white text-[22px] leading-3 mb-[14px]">
        Investment
      </p>
      <div className="flex flex-wrap w-full gap-4">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <InvestNowButton btnText="Invest Now" />
        </div>
        <div className="flex flex-1 flex-wrap gap-4">
          {totalInvest.map((item, index) => (
            <div key={index} className="w-full lg:flex-1">
              <TotalInvestCard name={item.name} value={item.value} />
            </div>
          ))}
        </div>
      </div>
    </TransparentCard>
  );
}

export default InvestmentStatsCard;
