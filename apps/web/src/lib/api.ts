import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token JWT
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  // if (session?.accessToken) {
  //   config.headers.Authorization = `Bearer ${session.accessToken}`;
  // }
  return config;
});

export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<T>(url);
  return response.data;
};

export const apiPost = async <T>(url: string, data: any): Promise<T> => {
  const response = await apiClient.post<T>(url, data);
  return response.data;
};

export const apiPatch = async <T>(url: string, data: any): Promise<T> => {
  const response = await apiClient.patch<T>(url, data);
  return response.data;
};

export const apiDelete = async <T>(url: string): Promise<T> => {
  const response = await apiClient.delete<T>(url);
  return response.data;
};
