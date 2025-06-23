'use client';

import { createContext, ReactNode, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';

import { fetchUser } from '@/actions/users';
import Logo from '@/icons/Logo';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import { useFavicon } from '@/hooks/useFavicon';

const UserContext = createContext<UserResponse | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { resolvedTheme } = useTheme();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    refetchOnWindowFocus: true,
  });
  const {
    data: globalSettings,
    isLoading: isGlobalSettingsLoading,
    isSuccess: isSuccessGlobalSettings,
  } = useGlobalSettings();

  const favIcon =
    resolvedTheme === 'dark'
      ? globalSettings?.dark_logo
      : globalSettings?.white_logo;

  useFavicon(favIcon as string);

  if (
    isLoading ||
    !isSuccess ||
    !isSuccessGlobalSettings ||
    isGlobalSettingsLoading
  ) {
    return (
      <div className="fixed inset-0 flex items-center justify-center -z-10">
        <div className="spin-and-zoom-animation transition-transform duration-500">
          <Logo />
        </div>
      </div>
    );
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
