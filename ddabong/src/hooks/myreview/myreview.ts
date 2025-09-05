import { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

type ActivityMyReviewResponseDTO =
  components['schemas']['ActivityMyReviewResponseDTO'];

export async function fetchMyReview(): Promise<ActivityMyReviewResponseDTO[]> {
  const { data, error } = await privateClient.GET('/activity/myreview');
  if (error) throw error;
  return data;
}

export function useMyReview() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myreview'],
    queryFn: fetchMyReview,
  });
  return { data, isLoading, error };
}
