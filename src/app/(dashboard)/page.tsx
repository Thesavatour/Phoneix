'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Statistics from '@/features/Dashborad/Statistics';
import Market from '@/features/Dashborad/Market';
import StatisticsGraph from '@/features/Dashborad/StatisticsGraph';
import Menu from '@/features/Dashborad/Menu';
import Loader from '@/components/Loader';
import UIDCard from '@/components/UIDCard';
import fetchDashboard from '@/actions/dashboard';
import { useUser } from '@/components/Provider/UserProvider';

export default function Home() {
  const { data, isLoading, isSuccess } = useQuery<DashboardResponse>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });

  const userInfo = useUser();

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  return (
    <>
      <div className="mb-4">
        <UIDCard uuid={userInfo?.users?.uuid || 'Loading...'} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4 h-full overflow-hidden">
        <div className="flex flex-col space-y-2 h-full">
          <div className="mt-14">
            <Menu data={data.capital_growth} />
          </div>
          <StatisticsGraph data={data.monthly_statistics} />
        </div>
        <div className="flex flex-col space-y-2 min-w-[350px]">
          <Statistics data={data.cash_flow_statistics} />
          <Market />
        </div>
      </div>
    </>
  );
}
