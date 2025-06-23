import apiService from '@/services/apiService';

const fetchMatrix = async ({ params }: ParamType): Promise<MatrixResponse> => {
  const response = await apiService.get('/user/matrix', {
    params,
  });
  return response.data;
};

const createMatrix = async (data: { uid: string }): Promise<void> => {
  const response = await apiService.post('/user/matrix/store', data);
  return response;
};

export { fetchMatrix, createMatrix };
