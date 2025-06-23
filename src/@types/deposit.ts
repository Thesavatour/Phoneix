type DipositResponse = {
  payment_gateways: PaymentGateway[];
  deposits: Deposit[];
  deposits_meta: Meta;
};

type Deposit = {
  initiated_at: string;
  trx: string;
  gateway: string;
  amount: string;
  charge: string;
  final_amount: string;
  wallet: string;
  Status: string;
  conversion: string,
  rate: string,
  currency: string,
};

type PaymentGateway = {
  name: string;
  type: number;
  minimum: string;
  maximum: string;
  details: null | string;
  file: string;
  code: string;
  parameters: {
    trx: Trx;
  } | null;
};

type Trx = {
  field_name: string;
  field_type: string;
  field_label: string;
};

type DepositCommissionResponse = {
  deposit_commissions: DepositCommission[];
  deposit_commission_meta: Meta;
};

type DepositCommission = {
  initiated_at: string;
  trx: string;
  amount: string;
  from_user: string;
  details: string;
};
