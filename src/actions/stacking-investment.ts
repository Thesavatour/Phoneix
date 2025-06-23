import apiService from '@/services/apiService';

interface Params {
  page: number;
}
const fetchStackingInvestments = async (
  params: Params
): Promise<StackingInvestmentResponse> => {
  const response = await apiService.get('/user/staking-investment', { params });
  return response.data;
};

const createStackingInvest = async (data: {
  amount: number;
  plan_id: number;
}): Promise<void> => {
  return await apiService.post('/user/staking-investment/save', data);
};

export { fetchStackingInvestments, createStackingInvest };
