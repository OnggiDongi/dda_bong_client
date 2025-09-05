import type { DetailedActivityPost } from '@/types/activity';
import { privateClient } from '@/lib/openapi-client';

export const fetchDetailedActivityPost = async (
  activityPostId: number,
): Promise<DetailedActivityPost> => {
  const { data, error } = await privateClient.GET('/posts/{activityPostId}', {
    params: {
      path: {
        activityPostId,
      },
    },
  });

  if (error || !data) {
    throw new Error('Failed to fetch activity post');
  }

  return data;
};
