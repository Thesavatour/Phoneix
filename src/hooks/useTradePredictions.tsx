import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchTradesPredection } from '@/actions/trades';

interface TradePrediction {
  page?: number;
}

const useTradePredictions = ({ page = 1 }: TradePrediction) => {
  return useQuery<TradesPredectionResponse, Error>({
    queryKey: ['tradePredictions', page],
    queryFn: () => fetchTradesPredection({ page }),
    placeholderData: keepPreviousData,
  });
};

export default useTradePredictions;
