import apiService from '@/services/apiService';

const fetchGlobalSettings = async (): Promise<GlobalSettings> => {
  const response = await apiService.get('/settings');
  return response.data;
};

export default fetchGlobalSettings;
