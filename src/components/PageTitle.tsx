import React from 'react';

interface PageTitleProps {
  title: string;
}
function PageTitle({ title }: PageTitleProps) {
  return (
    <p className="text-[25px] dark:text-[#FFF] text-black leading-[37.5px] font-normal">
      {title}
    </p>
  );
}

export default PageTitle;
