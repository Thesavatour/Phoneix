import PageTitle from '@/components/PageTitle';
import Tabs from '@/components/Tabs';
import ReferralRewards from '@/features/Matrix/ReferralRewards';
import Schema from '@/features/Matrix/Schema';

export const metadata = {
  title: 'Matrix',
};

function Matrix() {
  const tabList = [
    {
      label: 'Scheme',
      content: <Schema />,
    },
    {
      label: 'Referral Rewards',
      content: <ReferralRewards />,
    },
  ];
  return (
    <div>
      <div className="space-y-[10px] mb-4">
        <PageTitle title="Matrix" />
        <Tabs tabs={tabList} />
      </div>
    </div>
  );
}

export default Matrix;
