type WithdrawResponse = {
  withdraw_gateways: WithdrawGateway[];
  withdraw_logs: WithdrawLog[];
  withdraw_meta: Meta;
};

type WithdrawGateway = {
  id: number;
  name: string;
  min_limit: string;
  max_limit: string;
  parameters: WithdrawParameters;
};

type WithdrawParameters = {
  trx_id: AccountNo;
  account_no: AccountNo;
};

type AccountNo = {
  field_name: string;
  field_type: string;
  field_label: string;
};

type WithdrawLog = {
  initiated_at: string;
  trx: string;
  gateway: string;
  amount: string;
  charge: string;
  final_amount: string;
  conversion: string;
  Status: string;
  currency: string;
  after_charge: string
};
