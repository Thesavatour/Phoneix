import apiService from '@/services/apiService';

interface Params {
  date: string;
  search: string;
}

interface SchemaParams extends Params {
  status: string | null;
}

const fetchInvestmentsScheme = async (
  params: SchemaParams
): Promise<InvestmentSchemeResponse> => {
  const response = await apiService.get('/user/investments/funds', {
    params,
  });
  return response.data;
};

const fetchInvestmentsStatistics = async (
  params: Params
): Promise<InvestmentStatisticsResponse> => {
  const response = await apiService.get('/user/investments', {
    params,
  });
  return response.data;
};

const investmentNow = async (formData: {
  amount: string;
  uid: string;
}): Promise<void> => {
  return await apiService.post('/user/investments/store', formData);
};

const investmentCancelAction = async (formData: {
  uid: string;
}): Promise<void> => {
  return await apiService.post('/user/investments/cancel', formData);
};

const reInvestmentAction = async (formData: {
  uid: string;
  amount: string;
}): Promise<void> => {
  const response = await apiService.post(
    '/user/investments/make-re-investment',
    formData
  );
  return response;
};

const completeInvestmentAction = async (formData: {
  uid: string;
}): Promise<void> => {
  return await apiService.post(
    '/user/investments/complete-investment-transfer',
    formData
  );
};

export {
  fetchInvestmentsScheme,
  fetchInvestmentsStatistics,
  investmentNow,
  investmentCancelAction,
  reInvestmentAction,
  completeInvestmentAction,
};
