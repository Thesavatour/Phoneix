type MenuTabKeys = 'investment' | 'trading' | 'commissions' | 'wallets';

type DashboardResponse = {
  user: User;
  finance: Finance;
  capital_growth: CapitalGrowth;
  cash_flow_statistics: CashFlowStatistics;
  monthly_statistics: Array<string[]>;
  transactions: Transaction[];
};

type CapitalGrowth = {
  investment: CapitalGrowthInvestment;
  trade: Trade;
  commission: Commission;
  wallet: Wallet;
};

type Commission = {
  referral: number;
  investment: number;
  level: number;
  deposit: number;
};

type CapitalGrowthInvestment = {
  total_invest: string;
  total_profit: string;
  running_invest: string;
};

type Trade = {
  total_trade: string;
  wining_trade: string;
  loss_amount: string;
};

type Wallet = {
  primary_balance: string;
  investment_balance: string;
  trade_balance: string;
  practice_balance: string;
};

type CashFlowStatistics = {
  deposit: DashboardDeposit;
  withdraw: Withdraw;
};

type DashboardDeposit = {
  total: string;
  primary: PrimaryClass;
  investment: PrimaryClass;
  trade: PrimaryClass;
};

type PrimaryClass = {
  amount: string;
  percentage: number;
};

type Withdraw = {
  total: string;
  pending: string;
  rejected: string;
  charge: string;
};

type Finance = {
  total_invest: number;
  total_matrix_commissions: number;
  total_trading: number;
  total_deposit: string;
  total_withdraw: number;
  total_staking_investment: number;
};

type Transaction = {
  initiated_at: string;
  trx: string;
  amount: string;
  type: number;
  post_balance: string;
  Charge: string;
  source: string;
  wallet: string;
  details: string;
};

type Statistics = {
  id: number;
  color: string;
  title: string;
  amount: string;
  percentage: number | null;
}[];
