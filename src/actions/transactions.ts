import apiService from '@/services/apiService';

interface Params {
  search: string;
  page: number;
  date: string;
  type: string;
}

const fetchTransactions = async (
  params: Params
): Promise<TransactionsResponse> => {
  const response = await apiService.get('/user/transactions', {
    params,
  });
  return response.data;
};

export default fetchTransactions;
