import apiService from '@/services/apiService';

interface params {
  email: string;
}

const fetchWalletUser = async (params: params): Promise<WalletUserResponse> => {
  const response = await apiService.get('/user/wallets', {
    params,
  });
  return response.data;
};

const ownAccountTopUp = async (formData: {
  amount: string;
  account: string;
}): Promise<void> => {
  return await apiService.post('/user/wallets/transfer/own-account', formData);
};

const othersAccountTopUp = async (formData: {
  uuid: string;
  amount: string;
}): Promise<void> => {
  return await apiService.post(
    '/user/wallets/transfer/other-account',
    formData
  );
};

export { fetchWalletUser, ownAccountTopUp, othersAccountTopUp };
