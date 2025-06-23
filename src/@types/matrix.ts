type MatrixResponse = {
  plans: MatrixPlan[];
  matrix_log: MatrixLog;
  referral_commissions: MatrixCommission[];
  level_commissions: MatrixCommission[];
  referral_commissions_meta: Meta;
  level_commissions_meta: Meta;
};

type MatrixCommission = {
  initiated_at: string;
  trx: string;
  amount: string;
  from_user: string;
  details: string;
};

type MatrixLog = {
  id: number;
  uid: string;
  user_id: number;
  plan_id: number;
  name: string;
  trx: string;
  price: string;
  referral_reward: string;
  referral_commissions: string;
  level_commissions: string;
  meta: MatrixMeta;
  status: number;
  created_at: Date;
  updated_at: Date;
};

type MatrixMeta = {
  matrix_levels: MatrixLevel[];
};

type MatrixLevel = {
  level: number;
  amount: string;
};

type MatrixPlan = {
  aggregate_level_commission: number;
  get_back: number;
  uid: string;
  name: string;
  amount: string;
  referral_reward: string;
  is_recommend: number;
  status: number;
  level: MatrixPlanLevel[];
};

type MatrixPlanLevel = {
  level: string;
  amount: string;
  matrix: string;
  total: string;
};
