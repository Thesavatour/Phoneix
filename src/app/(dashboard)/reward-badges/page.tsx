import PageTitle from '@/components/PageTitle';
import RewardBadges from '@/features/RewardBadges/RewardBadges';

export const metadata = {
  title: 'Reward Badges',
};
function Page() {
  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Rewarrd Badges" />
      <RewardBadges />
    </div>
  );
}

export default Page;
