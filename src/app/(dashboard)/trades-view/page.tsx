import PageTitle from '@/components/PageTitle';
import TradeView from '@/features/TradesView/TradesVIew';

export const metadata = {
  title: 'Trade View',
};

function Page() {
  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Trade Market Insights" />
      <TradeView />
    </div>
  );
}

export default Page;
