import { components } from '@/types/openapi';
import { privateClient } from '@/lib/openapi-client';

export type DetailedActivityPost = components['schemas']['ActivityPostDetailResponseDTO'];

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
