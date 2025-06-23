type TradesPredectionResponse = {
  crypto_currency: CryptoCurrency[];
  crypto_currency_meta: Meta;
};

type TradesLogsResponse = {
  trade_logs: TradesLog[];
  trade_practice_logs: TradesLog[];
  trade_logs_meta: Meta;
  trade_practice_logs_meta: Meta;
};

type TradesLog = {
  initiated_at: string;
  crypto: string;
  price: string;
  amount: string;
  arrival_time: string;
  volume: string;
  outcome: string;
  status: string;
};

type CryptoCurrency = {
  name: string;
  file: string;
  pair: string;
  price: string;
  market_cap: string;
  daily_high: string;
  daily_low: string;
};

type Meta = {
  current_page: number;
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
};

type TradesStatisticsResponse = {
  statistics: TradesStatistics;
  monthly_report: Array<string[]>;
  wallet: Wallet;
};

type TradesStatistics = {
  total: string;
  today: string;
  wining: string;
  loss: string;
  draw: string;
  high: string;
  low: string;
};
