
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';
import { paths } from '@/types/openapi';

type ActivityPostDetailResponse =
  paths['/posts/{activityPostId}']['get']['responses']['200']['content']['application/json'];

const GET_ACTIVITY_POST_BY_ID_QUERY_KEY = 'getActivityPostById';

const fetchActivityPostById = async (
  activityPostId: number,
): Promise<ActivityPostDetailResponse> => {
  const { data, error } = await privateClient.GET('/posts/{activityPostId}', {
    params: {
      path: {
        activityPostId,
      },
    },
  });

  if (error) {
    throw new Error('Failed to fetch activity post');
  }

  return data;
};

export const useGetActivityPostById = (activityPostId: number) => {
  return useQuery<ActivityPostDetailResponse, Error>({
    queryKey: [GET_ACTIVITY_POST_BY_ID_QUERY_KEY, activityPostId],
    queryFn: () => fetchActivityPostById(activityPostId),
    enabled: !!activityPostId,
  });
};
