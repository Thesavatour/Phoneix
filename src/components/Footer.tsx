'use client';

import useGlobalSettings from '@/hooks/useGlobalSettings';

function Footer() {
  const { data } = useGlobalSettings();
  return (
    <footer className="text-[#6b7280] dark:text-[#d1d5db] text-xs text-center pb-2">
      © {new Date().getFullYear()} {data?.site_title}. All rights reserved.
    </footer>
  );
}

export default Footer;
