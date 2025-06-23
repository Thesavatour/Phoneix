type InvestmentSchemeResponse = {
  investment_plans: InvestmentPlan[];
  founds: Found[];
  founds_meta: Meta;
};

type Found = {
  initiated_at: string;
  uid: string;
  trx: string;
  plan: string;
  plan_uid: string;
  amount: string;
  profit: string;
  interest_rate: string;
  expiration_date: string;
  interest_type: null;
  should_pay: string;
  status: number;
  profit_time: string;
};

type InvestmentPlan = {
  uid: string;
  name: string;
  minimum: string;
  maximum: string;
  amount: string;
  interest_rate: string;
  duration: number | null;
  is_recommend: number;
  type: number;
  terms_policy: string;
  interest_type: number;
  time: string;
  interest_return_type: number;
  recapture_type: number;
  total_investment_interest: string;
  meta: string[];
};

type InvestmentStatisticsResponse = {
  statistics: InvestmentStatistics;
  monthly_report: Array<string[]>;
  profit_logs: ProfitLogs[];
  profit_logs_meta: Meta;
};

type ProfitLogs = {
  initiated_at: string;
  trx: string;
  amount: string;
  from_user: string;
  details: string;
};

type InvestmentStatistics = {
  today_invest: string;
  payable: string;
  total: string;
  running: string;
  profit: string;
  closed: string;
  re_invest: string;
};
