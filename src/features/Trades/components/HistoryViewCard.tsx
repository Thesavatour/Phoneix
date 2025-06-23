import Link from 'next/link';

import Button from '@/components/Button';

interface HistoryViewProps {
  btnText: string;
  title: string;
  icon: React.ReactNode;
  link: string;
}

function HistoryViewCard({ btnText, title, icon, link }: HistoryViewProps) {
  return (
    <>
      <div className="relative border dark:border-[#313131] border-[#E4E4E2] dark:bg-white/10 bg-white backdrop-blur-[17.5px] w-full px-4 py-5 overflow-hidden rounded-[16px]">
        <div className="absolute w-[100px] h-[100px] bg-primary blur-[140px] top-[-7px] left-[281px] dark:block hidden"></div>
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#232323]">
              {icon}
            </div>
            <div className="dark:text-[#ACB5BB] text-[16px] leading-6 font-normal">
              {title}
            </div>
          </div>
          <Link href={link}>
            <Button>{btnText}</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HistoryViewCard;
