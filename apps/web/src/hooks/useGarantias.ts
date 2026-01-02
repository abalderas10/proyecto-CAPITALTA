import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiDelete } from '@/lib/api';

export interface Garantia {
  id: string;
  tipo: string;
  valor: number;
  descripcion?: string;
  solicitudId: string;
}

export const useGetGarantias = (solicitudId: string) => {
  return useQuery({
    queryKey: ['garantias', solicitudId],
    queryFn: () => apiGet<Garantia[]>(`/solicitudes/${solicitudId}/garantias`),
    enabled: !!solicitudId,
  });
};

export const useCreateGarantia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Garantia>) => apiPost<Garantia>('/garantias', data),
    onSuccess: (_, variables) => {
      if (variables.solicitudId) {
        queryClient.invalidateQueries({ queryKey: ['garantias', variables.solicitudId] });
      }
    },
  });
};

export const useDeleteGarantia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete<{ success: boolean }>(`/garantias/${id}`),
    onSuccess: () => {
       // Invalidate all guaranties queries broadly or specific if we had context
       // Since we don't have solicitudId easily here, we might need to rely on refetching
       // or pass it in context. For now, simple invalidation.
       queryClient.invalidateQueries({ queryKey: ['garantias'] });
    }
  });
};
