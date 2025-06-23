import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchTradesHistoryLogs } from '@/actions/trades';

interface TradeHistoryParams {
  page: number;
  outcome: string;
  volume: string;
  search: string;
  date: string;
}

const useTradeHistoryLogs = (params: TradeHistoryParams) => {
  return useQuery<TradesLogsResponse, Error>({
    queryKey: ['trade-history-log', params],
    queryFn: () => fetchTradesHistoryLogs(params),
    placeholderData: keepPreviousData,
  });
};

export default useTradeHistoryLogs;
