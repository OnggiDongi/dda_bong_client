import { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

export type CertificationDTO =
  components['schemas']['CertificationResponseDTO'];

async function fetchMyCertificates(): Promise<CertificationDTO[]> {
  const { data, error } = await privateClient.GET('/certifications/');
  if (error) throw error;

  return data;
}

export function useMyCertificates() {
  return useQuery({
    queryKey: ['myCertificates'],
    queryFn: fetchMyCertificates,
  });
}
