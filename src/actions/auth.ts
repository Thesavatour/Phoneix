import apiService from '@/services/apiService';

const userSignUp = async (formData: SignUpFormData): Promise<AuthResponse> => {
  return await apiService.post('/auth/register', formData);
};

const userSignIn = async (formData: SignInFormData): Promise<AuthResponse> => {
  return await apiService.post('/auth/login', formData);
};

const userLogout = async (): Promise<LogoutResponse> => {
  return await apiService.post('/user/logout', {});
};

const userForgotPassword = async (
  formData: ForgotPasswordFormData
): Promise<ForgotPasswordResponse> => {
  return await apiService.post('/auth/forgot-password', formData);
};

const userChangePassword = async (
  formData: ChangePasswordFormData
): Promise<ChangePasswordResponse> => {
  return await apiService.post('/auth/reset-password', formData);
};

export {
  userSignUp,
  userSignIn,
  userLogout,
  userForgotPassword,
  userChangePassword,
};
