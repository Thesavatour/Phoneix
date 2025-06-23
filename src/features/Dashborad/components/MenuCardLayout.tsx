import BlurCircle from '@/components/BlurCircle';
import TransparentCard from '@/components/TransparentCard';
import MenuShapeDark from '@/icons/MenuShapeDark';
import MenuShapeLight from '@/icons/MenuShapeLight';
import MenuTabs from './MenuTabs';

interface Tab {
  label: string;
  value: MenuTabKeys;
}

interface MenuCardLayoutProps {
  children?: React.ReactNode;
  tabs: Tab[];
  activeTabValue: MenuTabKeys;
  onChange: (value: MenuTabKeys) => void;
}

function MenuCardLayout({
  children,
  tabs,
  activeTabValue,
  onChange,
}: MenuCardLayoutProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-[-54.5px] z-50 left-[-.5px]">
          <div className="flex items-center overflow-hidden">
            <div className="relative flex items-center justify-center">
              <MenuShapeDark />
              <div className="dark:hidden light:block">
                <MenuShapeLight />
              </div>
              <span className="absolute dark:text-white text-lg left-10">
                Menu
              </span>
            </div>
            <div className="flex items-center">
              <MenuTabs
                activeTabValue={activeTabValue}
                tabs={tabs}
                onChange={(activeTabValue) =>
                  onChange(activeTabValue as MenuTabKeys)
                }
              />
            </div>
          </div>
        </div>
        <TransparentCard className="border dark:border-[#313131] border-[#E4E4E2] p-5 rounded-b-[30px] rounded-tl-none rounded-tr-[30px] dark:bg-[#202020]">
          <BlurCircle className="absolute top-[97px] left-[69px] h-[71px] w-[71px] -z-10" />
          <BlurCircle className="absolute top-[-11px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[96px] w-[108px] -z-10 bg-[#232323]" />
          <BlurCircle className="absolute bottom-0 right-0 h-[107px] w-[112px] -z-10" />
          {children}
        </TransparentCard>
      </div>
    </div>
  );
}

export default MenuCardLayout;
