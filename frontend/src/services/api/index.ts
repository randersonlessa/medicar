import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../../config';
import AuthRepository from '../../repositories/auth';
import ConfigRepository from '../../repositories/config';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const keepSession = new ConfigRepository().getKeepSession();
    const storage = keepSession ? localStorage : sessionStorage;

    const token = new AuthRepository(storage).getToken();

    const configIntercepted = {
      ...config,
    };

    if (token) {
      const headers = {
        ...config?.headers,
        Authorization: `${token}`,
      };

      configIntercepted.headers = headers;
    }

    return configIntercepted;
  },
);

export default api;
