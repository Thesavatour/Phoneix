type InvestmentSetting = {
  matrix: number;
  investment: number;
  trade_prediction: number;
  staking_investment: number;
};

type SystemConfigurationModule = {
  title: string;
  value: number;
};

type SystemConfiguration = {
  e_pin: SystemConfigurationModule;
  language: SystemConfigurationModule;
  binary_trade: SystemConfigurationModule;
  practice_trade: SystemConfigurationModule;
  balance_transfer: SystemConfigurationModule;
  kyc_verification: SystemConfigurationModule;
  sms_notification: SystemConfigurationModule;
  withdraw_request: SystemConfigurationModule;
  cookie_activation: SystemConfigurationModule;
  investment_reward: SystemConfigurationModule;
  email_notification: SystemConfigurationModule;
  email_verification: SystemConfigurationModule;
  registration_status: SystemConfigurationModule;
};

type SignUpContentItem = {
  title: string;
  details: string;
};

type SignUpContent = {
  title: string;
  content: SignUpContentItem[];
};

type Enums = {
  transaction: {
    type: Record<string, number>;
    source: Record<string, number>;
    wallet_type: Record<string, number>;
    balance_type: Record<string, number>;
  };
  trade: {
    trade_outcome: Record<string, number>;
    trade_parameter: Record<string, number>;
    trade_status: Record<string, number>;
    trade_type: Record<string, number>;
    trade_volume: Record<string, number>;
  };
};

type GlobalSettings = {
  site_title: string;
  white_logo: string;
  dark_logo: string;
  trade_practice_balance: string;
  currency_name: string;
  currency_symbol: string;
  investment_setting: InvestmentSetting;
  system_configuration: SystemConfiguration;
  sign_up_content: SignUpContent;
  enums: Enums;
  commissions_charge: {
    e_pin_charge: number;
    trade_practice_balance: number;
    balance_transfer_charge: number;
    binary_trade_commissions: number;
    investment_cancel_charge: number;
    investment_transfer_charge: number;
  };
};
