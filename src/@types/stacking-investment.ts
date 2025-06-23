type StackingInvestmentResponse = {
  plans: StackingInvestmentPlan[];
  staking_investments: StakingInvestment[];
  staking_investments_meta: Meta;
};

type StackingInvestmentPlan = {
  id: number;
  minimum_amount: string;
  maximum_amount: string;
  interest_rate: string;
  duration: number;
};

type StakingInvestment = {
  initiated_at: string;
  amount: string;
  interest: string;
  total_return: string;
  expiration_date: string;
  status: string;
};
