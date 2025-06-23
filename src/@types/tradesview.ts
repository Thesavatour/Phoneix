type TradesViewResponse = {
  crypto: CryptoView;
  parameters: Parameter[];
  trade_logs: TradeViewLog[];
  trade_practice_logs: TradeViewLog[];
};

type CryptoView = {
  id: string;
  name: string;
  pair: string;
  crypto_id: string;
  file: string;
  symbol: string;
  status: string;
  top_gainer: string;
  top_loser: string;
  meta: CryptoMeta;
  created_at: string;
  updated_at: string;
};

type CryptoMeta = {
  low_24h: string;
  high_24h: string;
  market_cap: string;
  total_supply: string;
  total_volume: string;
  current_price: string;
  price_change_24h: string;
  market_cap_change_24h: string;
};

type Parameter = {
  id: string;
  time: string;
  unit: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type TradeViewLog = {
  initiated_at: string;
  crypto: string;
  price: string;
  amount: string;
  arrival_time: string;
  volume: string;
  outcome: string;
  status: string;
};
