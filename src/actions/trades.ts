import apiService from '@/services/apiService';

interface TradePrediction {
  page: number;
}

const fetchTradesPredection = async ({
  page = 1,
}: TradePrediction): Promise<TradesPredectionResponse> => {
  const response = await apiService.get(
    `/user/trade-prediction/crypto?page=${page}`
  );
  return response.data;
};

const fetchTradesStatistics = async (): Promise<TradesStatisticsResponse> => {
  const response = await apiService.get('/user/trade-prediction/statistics');
  return response.data;
};

const fetchTradesHistoryLogs = async (params: {
  page: number;
  outcome: string;
  volume: string;
  search: string;
  date: string;
}): Promise<TradesLogsResponse> => {
  const response = await apiService.get('/user/trade-prediction', {
    params,
  });
  return response.data;
};

export { fetchTradesPredection, fetchTradesStatistics, fetchTradesHistoryLogs };
