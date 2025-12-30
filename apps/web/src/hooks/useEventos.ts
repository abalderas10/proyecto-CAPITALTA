import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api';

export interface Evento {
  id: string;
  user: string;
  text: string;
  date: string;
}

export const useGetEventos = (solicitudId: string) => {
  return useQuery({
    queryKey: ['eventos', solicitudId],
    queryFn: () => apiGet<Evento[]>(`/solicitudes/${solicitudId}/eventos`),
    enabled: !!solicitudId,
  });
};
