import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

export async function fetchUserSummary() {
  const { data, error } = await privateClient.GET('/users/summary');
  if (error) throw error;
  return data;
}

export function useUserSummary() {
  return useQuery({
    queryKey: ['userSummary'],
    queryFn: fetchUserSummary,
  });
}
