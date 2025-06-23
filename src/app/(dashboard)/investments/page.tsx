import PageTitle from '@/components/PageTitle';
import Tabs from '@/components/Tabs';
import InvestScheme from '@/features/Investments/InvestScheme';
import ProfitStatistics from '@/features/Investments/ProfitStatistics';

export const metadata = {
  title: 'Investments',
};

function Page() {
  const tabList = [
    {
      label: 'Scheme',
      content: <InvestScheme />,
    },
    {
      label: 'Profit Statistics',
      content: <ProfitStatistics />,
    },
  ];
  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Investments" />
      <Tabs tabs={tabList} />
    </div>
  );
}

export default Page;
