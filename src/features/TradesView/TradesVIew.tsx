'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import RiseFall from './components/RiseFall';
import TradingViewWidget from '@/features/TradesView/components/TradingViewWidget';
import TradesViewLog from './components/TradesViewLog';
import { fetchTradesView } from '@/actions/tradesview';
import Loader from '@/components/Loader';

function TradeView() {
  const searchParams = useSearchParams();
  const pair = searchParams.get('pair');
  const type = searchParams.get('type');

  const { data, isLoading, isSuccess } = useQuery<TradesViewResponse>({
    queryKey: ['trades-view', pair],
    queryFn: () => fetchTradesView({ route: pair as string }),
    enabled: !!pair,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
  });

  if (isLoading || !isSuccess || !data) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex gap-3 h-full flex-col md:flex-row">
        <div className="flex flex-col space-y-2 flex-grow">
          <TradingViewWidget crypto={data.crypto} />
        </div>
        <div className='flex flex-col space-y-2 w-full md:w-[300px]'>
          <RiseFall
            parameters={data.parameters}
            crypto={data.crypto}
            type={type as string}
          />
        </div>
      </div>
      <TradesViewLog
        data={type === 'trade' ? data.trade_logs : data.trade_practice_logs}
        type={type as string}
      />
    </>
  );
}

export default TradeView;
