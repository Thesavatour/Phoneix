type RewardResponse = {
  title: string;
  investmentUserRewards: InvestmentUserReward[];
};

type InvestmentUserReward = {
  initiated_at: string;
  id: number;
  level: string;
  name: string;
  reward: string;
  invest: string;
  team_invest: string;
  deposit: string;
  minimum_referral: string;
};
