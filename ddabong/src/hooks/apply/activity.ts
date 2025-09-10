import type { DetailedActivityPost } from '@/types/activity';
import type { components } from '@/types/openapi';
import { privateClient as client } from '@/lib/openapi-client';

type ActivityPostListItem = components['schemas']['ActivityPostResponseDTO'];

export const fetchDetailedActivityPost = async (
  postId: number
): Promise<DetailedActivityPost & { isLiked: boolean; isApplied: boolean }> => {
  const [postRes, likedRes, historyRes] = await Promise.all([
    client.GET('/posts/{activityPostId}', {
      params: { path: { activityPostId: postId } },
    }),
    client.GET('/users/likes'),
    client.GET('/users/history'),
  ]);

  if (postRes.error || !postRes.data)
    throw postRes.error || new Error('Post not found');

  const postData = postRes.data;

  const isLiked =
    likedRes.data?.some((p: ActivityPostListItem) => p.id === postId) || false;

  const isApplied =
    historyRes.data?.some((p: ActivityPostListItem) => p.id === postId) ||
    false;

  return { ...postData, isLiked, isApplied };
};
