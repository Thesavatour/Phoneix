'use client';

import { useSearchParams } from 'next/navigation';

import PageTitle from '@/components/PageTitle';
import Tabs from '@/components/Tabs';
import Analytics from '@/features/TradesHistory/Analytics';
import History from '@/features/TradesHistory/History';
import PracticeHistory from '@/features/TradesHistory/PracticeHistory';

const tabList = [
  {
    label: 'Analytics',
    content: <Analytics />,
  },
  {
    label: 'Trade History',
    content: <History />,
  },
  {
    label: 'Practice History',
    content: <PracticeHistory />,
  },
];

function Page() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Trades" />
      <Tabs tabs={tabList} initialTab={Number(tab ?? 0)} />
    </div>
  );
}

export default Page;
