
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';
import { paths } from '@/types/openapi';

type ApplicantDetailResponse =
  paths['/apply/{userId}']['get']['responses']['200']['content']['application/json'];

const GET_APPLICANT_BY_ID_QUERY_KEY = 'getApplicantById';

const fetchApplicantById = async (userId: number): Promise<ApplicantDetailResponse> => {
  const { data, error } = await privateClient.GET('/apply/{userId}', {
    params: {
      path: {
        userId,
      },
    },
  });

  if (error) {
    throw new Error('Failed to fetch applicant');
  }

  return data;
};

export const useGetApplicantById = (userId: number) => {
  return useQuery<ApplicantDetailResponse, Error>({
    queryKey: [GET_APPLICANT_BY_ID_QUERY_KEY, userId],
    queryFn: () => fetchApplicantById(userId),
    enabled: !!userId,
  });
};
