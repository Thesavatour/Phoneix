import { cn } from '@/utilits';
import { motion } from 'framer-motion';

interface Tab {
  label: string;
  value: string;
}

interface MenuTabsProps {
  tabs: Tab[];
  activeTabValue: string;
  onChange: (value: string) => void;
}

const MenuTabs = ({ tabs, activeTabValue, onChange }: MenuTabsProps) => {
  return (
    <div className="flex min-[425px]:w-[220px] min-[375px]:w-[150px] sm:w-full overflow-x-auto custom-scrollbar-horizontal">
      {tabs.map((tab) => {
        const isActive = activeTabValue === tab.value;

        return (
          <motion.button
            key={tab.value}
            className={cn(
              'h-8 px-[18px] py-[6px] text-sm font-medium flex-shrink-0 rounded-[36px] snap-center transition-colors duration-300',
              isActive
                ? 'dark:bg-white bg-black dark:text-black text-white'
                : 'dark:text-white-rgba-80'
            )}
            onClick={() => onChange(tab.value)}
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default MenuTabs;
