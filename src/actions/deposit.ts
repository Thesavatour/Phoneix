import apiService from '@/services/apiService';

const fetchDeposit = async ({
  params,
}: ParamType): Promise<DipositResponse> => {
  const response = await apiService.get('/user/payments', {
    params,
  });
  return response.data;
};

const fetchDepositCommissions = async ({
  params,
}: ParamType): Promise<DepositCommissionResponse> => {
  const response = await apiService.get('/user/payments/deposit-commission', {
    params,
  });
  return response.data;
};

const createTraditionalDeposit = async (
  data: Record<string, any>
): Promise<void> => {
  return await apiService.post('/user/payments/traditional', data);
};

const createPaymentDeposit = async (
  data: Record<string, any>
): Promise<void> => {
  return await apiService.post("/user/payments/process", data);
};


export { fetchDeposit, fetchDepositCommissions, createTraditionalDeposit, createPaymentDeposit };
