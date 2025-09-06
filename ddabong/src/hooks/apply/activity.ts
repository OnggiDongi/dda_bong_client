import type { components } from '@/types/openapi';
import { privateClient as client } from '@/lib/openapi-client';
import type { DetailedActivityPost } from '@/types/activity';

type ActivityPostListItem = components['schemas']['ActivityPostResponseDTO'];

export const fetchDetailedActivityPost = async (
  postId: number,
): Promise<DetailedActivityPost & { isLiked: boolean; isApplied: boolean }> => {
  // Fetch post details, liked list, and application history concurrently
  const [postRes, likedRes, historyRes] = await Promise.all([
    client.GET('/posts/{activityPostId}', {
      params: { path: { activityPostId: postId } },
    }),
    client.GET('/users/likes'),
    client.GET('/users/history'),
  ]);

  if (postRes.error || !postRes.data) throw postRes.error || new Error('Post not found');

  const postData = postRes.data;

  // Check if the current post is in the liked list
  const isLiked =
    likedRes.data?.some((p: ActivityPostListItem) => p.id === postId) || false;

  // Check if the current post is in the application history
  const isApplied =
    historyRes.data?.some((p: ActivityPostListItem) => p.id === postId) ||
    false;

  // Return the augmented post object with correct initial states
  return { ...postData, isLiked, isApplied };
};
