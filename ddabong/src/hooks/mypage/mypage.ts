import { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

type UserDTO = components['schemas']['UserResponseDTO'];

export async function fetchUser(): Promise<UserDTO> {
  const { data, error } = await privateClient.GET('/users');
  if (error) throw error;
  return data;
}

export function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
  return { data, isLoading, error };
}
