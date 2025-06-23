import apiService from '@/services/apiService';

const fetchWithdraw = async ({
  params,
}: ParamType): Promise<WithdrawResponse> => {
  const response = await apiService.get('/user/withdraws', {
    params,
  });
  return response.data;
};

const createWithdraw = async (formData: FormData): Promise<void> => {
  return await apiService.post('/user/withdraws/store', formData);
};

export { fetchWithdraw, createWithdraw };
