'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
    setMounted(true);
  }, [setTheme]);

  if (!mounted) return null;

  if (resolvedTheme === 'dark') {
    return (
      <div
        onClick={() => setTheme('light')}
        className="dark:border dark:border-[#313131] border-[#E4E4E2] inline-flex items-center rounded-lg p-[10px] bg-black dark:bg-white-rgba-10 cursor-pointer h-9 w-9"
      >
        <svg
          id="theme-toggle-light-icon"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    );
  }

  if (resolvedTheme === 'light') {
    return (
      <div
        onClick={() => setTheme('dark')}
        className="border dark:border-[#313131] border-[#E4E4E2] inline-flex items-center rounded-lg p-[10px] bg-black dark:bg-white-rgba-10 cursor-pointer h-9 w-9"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.18105 8.25792C10.8477 12.8767 15.8577 11.5238 12.6691 13.3648C9.48046 15.2057 5.40319 14.1132 3.56225 10.9246C1.7213 7.73597 2.8138 3.6587 6.00242 1.81775C9.19103 -0.023198 5.51438 3.63912 8.18105 8.25792Z"
            stroke="white"
            stroke-width="1.5"
          />
        </svg>
      </div>
    );
  }
}
