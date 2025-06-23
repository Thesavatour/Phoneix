type SignUpFormData = {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
};

type SignInFormData = {
  email: string;
  password: string;
};

type AuthResponse = {
  status: string;
  code: number;
  message: string;
  data: {
    access_token: string;
  };
};

type LogoutResponse = {
  message: string;
};

type ForgotPasswordResponse = {
  status: string;
  code: number;
  message: string;
  data: {
    id: number;
    email: string;
    token: number;
    created_at: string;
    updated_at: string;
  };
};

type ChangePasswordResponse = {
  status: string;
  code: number;
  message: string;
  data: null;
};

type ForgotPasswordFormData = {
  email: string;
};

type ChangePasswordFormData = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};
