import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      Cookies.remove('access_token');
      window.location.href = '/sign-in';
    }
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

const apiService = {
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  post: async <T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    let requestConfig = { ...config };
    let requestData = data;

    // Check if data contains File or Blob
    const hasFile = Object.values(data).some(
      (value) => value instanceof File || value instanceof Blob
    );

    if (hasFile) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      requestData = formData;
      requestConfig = {
        ...requestConfig,
        headers: {
          ...requestConfig?.headers,
          "Content-Type": "multipart/form-data",
        },
      };
    }

    const response = await api.post<T>(url, requestData, requestConfig);
    return response.data;
  },

  put: async <T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};

export default apiService;
