import apiService from '@/services/apiService';

const fetchReward = async (): Promise<RewardResponse> => {
  const response = await apiService.get('/user/matrix/investment-rewards');
  return response.data;
};

export default fetchReward;
