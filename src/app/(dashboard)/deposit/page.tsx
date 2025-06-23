'use client';

import { useSearchParams } from 'next/navigation';

import PageTitle from '@/components/PageTitle';
import Tabs from '@/components/Tabs';
import Commissions from '@/features/Deposit/Commissions';
import Instant from '@/features/Deposit/Instant';
import InstaPINRecharge from '@/features/Deposit/InstaPINRecharge';
import { useEffect } from 'react';

const tabList = [
  {
    label: 'Instant',
    content: <Instant />,
  },
  {
    label: 'Commissions',
    content: <Commissions />,
  },
  {
    label: 'InstaPIN Recharge',
    content: <InstaPINRecharge />,
  },
];

export default function Page() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  useEffect(() => {
    document.title = 'Deposit';
  }, []);

  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Deposit" />
      <Tabs tabs={tabList} initialTab={Number(tab ?? 0)} />
    </div>
  );
}
