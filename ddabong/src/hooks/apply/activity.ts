import { components } from '@/types/openapi';
import { privateClient as client } from '@/lib/openapi-client';
import { DetailedActivityPost } from '@/app/apply/[id]/page';

type ActivityPostListItem = components['schemas']['ActivityPostResponseDTO'];

export const fetchDetailedActivityPost = async (postId: number) => {
  // Fetch post details, liked list, and application history concurrently
  const [postRes, likedRes, historyRes] = await Promise.all([
    client.GET('/posts/{activityPostId}', {
      params: { path: { activityPostId: postId } },
    }),
    client.GET('/users/likes'),
    client.GET('/users/history'),
  ]);

  if (postRes.error) throw postRes.error;

  const postData = postRes.data as DetailedActivityPost;

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
