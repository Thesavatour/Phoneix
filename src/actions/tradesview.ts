import apiService from '@/services/apiService';

interface TradeViewParam {
  route: string;
}
const fetchTradesView = async ({
  route,
}: TradeViewParam): Promise<TradesViewResponse> => {
  const response = await apiService.get(
    `/user/trade-prediction/trade/${route}`
  );
  return response.data;
};

const tradeRiseFall = async (
  data: {
    amount: string;
    volume: string;
    parameter_id: string;
    type: string;
  },
  id: string
): Promise<void> => {
    return await apiService.post(
      `/user/trade-prediction/save/${id}`,
      data
  );
};

export { fetchTradesView, tradeRiseFall };
