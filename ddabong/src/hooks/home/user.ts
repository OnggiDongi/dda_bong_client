import { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

type UserSummaryDTO = components['schemas']['UserSummaryResponseDTO'];

export async function fetchUserSummary(): Promise<UserSummaryDTO> {
  const { data, error } = await privateClient.GET('/users/summary');
  if (error) throw error;
  return data as UserSummaryDTO;
}

export function useUserSummary() {
  return useQuery({
    queryKey: ['userSummary'],
    queryFn: fetchUserSummary,
  });
}
