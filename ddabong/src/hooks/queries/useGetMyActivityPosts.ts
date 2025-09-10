import type { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

export interface MyActivityPost {
  id: number;
  title: string;
  imageUrl: string;
  category: components['schemas']['ActivityResponseDTO']['category'];
  applicantNum: number;
  capacity?: number;
  totalAvgScore?: number;
  endAt: string;
}

type PostSummary = components['schemas']['MyActivityPostResponseDTO'];

const getActivityPostList = async (
  isRecruiting: boolean
): Promise<PostSummary[]> => {
  const { data, error } = await privateClient.GET('/posts/myposts', {
    params: {
      query: {
        isRecruting: isRecruiting,
      },
    },
  });
  if (error) throw error;
  return data as PostSummary[];
};

// const getActivityPostDetail = async (id: number): Promise<PostDetail> => {
//   const { data, error } = await privateClient.GET('/posts/{id}', {
//     params: {
//       path: { id },
//     },
//   });
//   if (error) throw error;
//   return data as PostDetail;
// };
export async function getActivityPostDetail(activityPostId: number) {
  const { data, error } = await privateClient.GET('/posts/{activityPostId}', {
    params: {
      path: { activityPostId },
    },
  });
  if (error) throw error;
  return data;
}

export const useGetMyActivityPosts = (isRecruiting: boolean) => {
  const {
    data: postList,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  } = useQuery<PostSummary[], Error>({
    queryKey: ['myActivityPostList', isRecruiting],
    queryFn: () => getActivityPostList(isRecruiting),
  });

  return {
    data: postList,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  };
};
