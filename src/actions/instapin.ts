import apiService from '@/services/apiService';

const fetchInstaPins = async ({
  params,
}: ParamType): Promise<InstaPinResponse> => {
  const response = await apiService.get('/user/insta-pin', {
    params,
  });
  return response.data;
};

const instaPinRecharge = async (data: {
  pin_number: string;
}): Promise<void> => {
  return await apiService.post('/user/insta-pin/recharge', data);
};

const instaPinGenerate = async (data: { amount: number }): Promise<void> => {
  return await apiService.post('/user/insta-pin/generate', data);
};

export { fetchInstaPins, instaPinRecharge, instaPinGenerate };
