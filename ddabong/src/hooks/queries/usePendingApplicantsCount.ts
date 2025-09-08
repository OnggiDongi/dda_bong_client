import { useApplicants } from './useGetApplicants';

export function usePendingApplicantsCount(postId: number) {
  const { data: applicantsData } = useApplicants(postId);

  if (!applicantsData || !applicantsData.reviews) {
    return 0;
  }

  return applicantsData.reviews.filter((r) => r.status === 'PENDING').length;
}
