import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.capitalta.abdev.click',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos timeout
});

// Interceptor para inyectar el token JWT
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export const apiGet = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Error al cargar datos';
    throw new Error(message);
  }
};

export const apiPost = async <T>(url: string, data: any): Promise<T> => {
  try {
    const config = data instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Error al enviar datos';
    throw new Error(message);
  }
};

export const apiPatch = async <T>(url: string, data: any): Promise<T> => {
  try {
    const config = data instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Error al actualizar datos';
    throw new Error(message);
  }
};

export const apiDelete = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(url);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Error al eliminar datos';
    throw new Error(message);
  }
};
