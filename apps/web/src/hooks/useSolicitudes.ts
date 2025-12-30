import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiPatch } from '@/lib/api';

export interface Solicitud {
  id: string;
  producto: string;
  monto: number;
  plazo: number;
  status: string;
  cliente: string;
  fecha: string;
  createdAt?: string;
}

interface GetSolicitudesParams {
  status?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}

export const useGetSolicitudes = (params: GetSolicitudesParams) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return useQuery({
    queryKey: ['solicitudes', params],
    queryFn: () => apiGet<{ items: Solicitud[]; total: number }>(`/solicitudes?${queryString}`),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useGetSolicitudById = (id: string) => {
  return useQuery({
    queryKey: ['solicitud', id],
    queryFn: () => apiGet<Solicitud>(`/solicitudes/${id}`),
    enabled: !!id, // Solo ejecutar si hay un ID
  });
};

export const useCreateSolicitud = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Solicitud>) => apiPost<Solicitud>('/solicitudes', data),
    onSuccess: () => {
      // Invalidar y refetch la lista de solicitudes
      queryClient.invalidateQueries({ queryKey: ['solicitudes'] });
    },
  });
};

export const useUpdateSolicitud = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Solicitud> }) =>
      apiPatch<Solicitud>(`/solicitudes/${id}`, data),
    onSuccess: (_, variables) => {
      // Invalidar la solicitud específica y la lista
      queryClient.invalidateQueries({ queryKey: ['solicitud', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['solicitudes'] });
    },
  });
};
