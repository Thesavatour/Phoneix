import PageTitle from '@/components/PageTitle';
import Tabs from '@/components/Tabs';
import General from '@/features/Settings/General';
import Security from '@/features/Settings/Security';

export const metadata = {
  title: 'Settings',
};

function Page() {
  const tabList = [
    {
      label: 'General',
      content: <General />,
    },
    {
      label: 'Security',
      content: <Security />,
    },
  ];
  return (
    <div className="space-y-[10px] mb-4">
      <PageTitle title="Settings" />
      <General />
    </div>
  );
}

export default Page;
