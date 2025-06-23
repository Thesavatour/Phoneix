import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import BlurCircle from '@/components/BlurCircle';
import Button from '@/components/Button';
import CardTitle from '@/components/CardTitle';
import TransparentCard from '@/components/TransparentCard';
import TradeBalanceIcon from '@/icons/TradeBalanceIcon';
import TradeLogCard from './components/TradeLogCard';
import TradeStats from './components/TradeStats';
import { fetchTradesStatistics } from '@/actions/trades';
import Loader from '@/components/Loader';
import useGlobalSettings from '@/hooks/useGlobalSettings';

function Analytics() {
  const { data: globalSettings } = useGlobalSettings();
  const { data, isSuccess } = useQuery({
    queryKey: ['trades-statistics'],
    queryFn: fetchTradesStatistics,
  });

  if (!isSuccess) {
    return <Loader />;
  }
  const tradeLogs = [
    {
      title: 'Total Trades',
      balance: data.statistics.total,
    },
    {
      title: 'Trades Today',
      balance: data.statistics.today,
    },
    {
      title: 'Total Winning Amount',
      balance: data.statistics.wining,
    },
    {
      title: 'Total Loss Amount',
      balance: data.statistics.loss,
    },
    {
      title: 'High Trade Amount',
      balance: data.statistics.high,
    },
    {
      title: 'Lowe Trade Amount',
      balance: data.statistics.low,
    },
    {
      title: 'Drawn Trade Amount',
      balance: data.statistics.draw,
    },
    {
      title: 'Practice Account Balance',
      balance: data.wallet.practice_balance,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <TransparentCard className="w-full h-full md:max-w-[401px]">
          <BlurCircle className="absolute top-[-11px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[96px] w-[108px] -z-10" />
          <CardTitle title="Comprehensive Trading Overview" />
          <div className="flex items-center gap-2 mt-6">
            <div className="h-[50px] w-[50px] flex justify-center items-center bg-[#3B3B3B] rounded-full">
              <TradeBalanceIcon />
            </div>
            <p className="dark:text-white-rgba-70 text-base leading-6">
              Trade Balance
            </p>
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <p className="text-[26px] leading-[39px] dark:text-white">
              {globalSettings?.currency_symbol}
              {data.wallet.trade_balance}
            </p>
          </div>
          <div className="flex items-center gap-[18px] mt-[30px]">
            <Link href="/trades" prefetch={false}>
              <Button>Trade Now</Button>
            </Link>
            <Link href="/top-up" prefetch={false}>
              <Button className="bg-[#3B3B3B] text-white hover:text-black">
                Transfer Funds
              </Button>
            </Link>
          </div>
        </TransparentCard>
        <TransparentCard className="w-full flex-1">
          <BlurCircle className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 h-[71px] w-[74px] -z-10" />
          <BlurCircle className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 h-[112px] w-[107px] -z-10" />
          <BlurCircle className="bg-[#232323] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[112px] w-[107px] -z-10" />
          <CardTitle className="mb-[14px]" title="Trade Logs" />
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
            {tradeLogs.map((tradeLog, index) => (
              <div className="flex-1" key={index}>
                <TradeLogCard
                  key={index}
                  title={tradeLog.title}
                  balance={tradeLog.balance}
                />
              </div>
            ))}
          </div>
        </TransparentCard>
      </div>
      <TradeStats
        data={data.monthly_report[1]}
        categories={data.monthly_report[0]}
      />
    </div>
  );
}

export default Analytics;
