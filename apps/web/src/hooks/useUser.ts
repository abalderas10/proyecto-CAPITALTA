import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPatch } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
  createdAt?: string;
  organizacionId?: string;
}

export interface UpdateUserData {
  nombre?: string;
  password?: string;
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => apiGet<User>('/me'),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => apiGet<User>(`/users/${id}`),
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      apiPatch<User>(`/users/${id}`, data),
    onSuccess: (_, variables) => {
      // Invalidar el usuario específico y el /me
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
};
