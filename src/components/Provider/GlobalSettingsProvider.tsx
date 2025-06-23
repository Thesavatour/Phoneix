'use client';

import useGlobalSettings from '@/hooks/useGlobalSettings';
import Loader from '../Loader';

interface GlobalSettingsProps {
  children: React.ReactNode;
}
function GlobalSettingsProvider({ children }: GlobalSettingsProps) {
  const { data, isLoading, isSuccess } = useGlobalSettings();
  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  return <div>{children}</div>;
}

export default GlobalSettingsProvider;
