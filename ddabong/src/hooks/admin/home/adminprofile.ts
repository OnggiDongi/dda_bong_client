import { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

type InstitutionSummaryResponseDTO =
  components['schemas']['InstitutionSummaryResponseDTO'];

export async function fetchInstitutionSummary(): Promise<InstitutionSummaryResponseDTO> {
  const { data, error } = await privateClient.GET('/institutions/summary');
  if (error) throw error;
  return data;
}

export function useInstitutionSummary() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['institutionSummary'],
    queryFn: fetchInstitutionSummary,
  });
  return { data, isLoading, error };
}
