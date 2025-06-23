import React from 'react';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Instructions({ icon, title, description }: Props) {
  return (
    <div>
      {icon}
      <p className="text-black dark:text-white text-base leading-6 mt-[14px]">
        {title}
      </p>
      <p className="dark:text-white-rgba-50 text-sm leading-5 mt-2 text-black-rgba-50">
        {description}
      </p>
    </div>
  );
}

export default Instructions;
