'use client';

import type { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

export type UserSummary = components['schemas']['UserSummaryResponseDTO'];

export async function fetchUserSummary(): Promise<UserSummary> {
  const { data, error } = await privateClient.GET('/users/summary');
  if (error) throw error;
  return data ?? {};
}

export function useUserSummary() {
  return useQuery({
    queryKey: ['userSummary'],
    queryFn: fetchUserSummary,
    staleTime: 60_000, // 1분 동안 fresh
  });
}
