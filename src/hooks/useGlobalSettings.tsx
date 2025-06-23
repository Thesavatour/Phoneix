import { useQuery } from '@tanstack/react-query';

import fetchGlobalSettings from '@/actions/settings';

const useGlobalSettings = () => {
  return useQuery<GlobalSettings, Error>({
    queryKey: ['global-settings'],
    queryFn: () => fetchGlobalSettings(),
  });
};

export default useGlobalSettings;
