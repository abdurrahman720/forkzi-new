import axios, { AxiosError } from 'axios';
import { API_CONFIG } from './config';
import { ApiError } from './errors';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': API_CONFIG.apiKey
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;

      if (status === 401) {
        throw new ApiError('Authentication failed. Please check your API key.', status, 'AUTH_ERROR');
      }
      if (status === 429) {
        throw new ApiError('Rate limit exceeded. Please try again later.', status, 'RATE_LIMIT');
      }
      throw new ApiError(
        data?.message || `Request failed with status ${status}`,
        status,
        data?.code
      );
    }
    if (error.request) {
      throw new ApiError('No response received from server', 0, 'NETWORK_ERROR');
    }
    throw new ApiError('Request configuration error', 0, 'CONFIG_ERROR');
  }
);

export const apiClient = axiosInstance;