import { paths } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

export async function getApplicants(activityPostId: number) {
  const { data, error } = await privateClient.GET(
    '/posts/apply/{activityPostId}',
    {
      params: {
        path: {
          activityPostId,
        },
      },
    }
  );
  if (error) throw error;
  return data;
}

export async function getApplicantInfo(userId: number) {
  const { data, error } = await privateClient.GET('/apply/{userId}', {
    params: {
      path: {
        userId,
      },
    },
  });
  if (error) throw error;
  return data;
}

export function useApplicantInfo(userId: number) {
  return useQuery<GetApplicantResponse>({
    queryKey: ['getApplicantInfo', userId],
    queryFn: () => getApplicantInfo(userId),
    enabled: !!userId,
  });
}

type GetApplicantResponse =
  paths['/apply/{userId}']['get']['responses']['200']['content']['application/json'];

export function useApplicants(activityPostId: number) {
  return useQuery({
    queryKey: ['getApplicants', activityPostId],
    queryFn: () => getApplicants(activityPostId),
    enabled: !!activityPostId,
  });
}
