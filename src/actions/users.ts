import apiService from '@/services/apiService';

const fetchUser = async (): Promise<UserResponse> => {
  const response = await apiService.get('/user');
  return response.data;
};

const userUpdate = async (formData: FormData): Promise<UserUpdateResponse> => {
  return await apiService.post('/user/profile-update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export { fetchUser, userUpdate };
