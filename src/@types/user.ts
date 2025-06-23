type User = {
  uuid: string;
  referral_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  image: string;
  kyc_status: number;
  status: number;
  meta: AddressMeta;
};

type wallet = {
  primary_balance: string;
  investment_balance: string;
  trade_balance: string;
  practice_balance: string;
};

type AddressMeta = {
  address: Address;
};

type Address = {
  city: string;
  state: string;
  address: string;
  country: string;
  post_code: string;
};

type UserResponse = {
  users: User;
  wallet: wallet;
};

type UserUpdateResponse = {
  data: User;
  message: string;
  status: 'success' | 'error';
};
