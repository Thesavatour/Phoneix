'use client';
import { useQuery } from '@tanstack/react-query';

import RewardBadgesCard from './components/RewardBadgesCard';
import fetchReward from '@/actions/rewarrd';
import Loader from '@/components/Loader';

function RewardBadges() {
  const rewardbadges = [
    {
      level: 1,
      badgeName: 'Bronze Starter',
      minInvest: 1000,
      minTeamInvest: 1000,
      minDeposit: 1000,
    },
    {
      level: 2,
      badgeName: 'Silver Starter',
      minInvest: 2000,
      minTeamInvest: 2000,
      minDeposit: 2000,
    },
    {
      level: 3,
      badgeName: 'Gold Starter',
      minInvest: 3000,
      minTeamInvest: 3000,
      minDeposit: 3000,
    },
    {
      level: 4,
      badgeName: 'Platinum Starter',
      minInvest: 4000,
      minTeamInvest: 4000,
      minDeposit: 4000,
    },
  ];

  const { data, isLoading, isSuccess } = useQuery<RewardResponse>({
    queryKey: ['reward'],
    queryFn: fetchReward,
  });

  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {data.investmentUserRewards.map((rewardbadges, index) => (
        <RewardBadgesCard key={index} data={rewardbadges} />
      ))}
    </div>
  );
}

export default RewardBadges;
