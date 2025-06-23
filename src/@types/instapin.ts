type InstaPinResponse = {
  pins: Pin[];
  pin_meta: Meta;
};

type Pin = {
  initiated_at: string;
  amount: string;
  charge: string,
  pin_number: string;
  status: string;
  details: string;
};
