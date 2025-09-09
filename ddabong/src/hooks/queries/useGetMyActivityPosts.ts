import type { components } from '@/types/openapi';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
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
type PostDetail = components['schemas']['ActivityPostDetailResponseDTO'];

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
    // staleTime: 1000 * 60 * 5,
  });

  return {
    data: postList,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  };

  // const detailQueries = useQueries({
  //   queries: (postList || []).map((post) => ({
  //     queryKey: ['activityPostDetail', post.id],
  //     queryFn: () => getActivityPostDetail(post.id!),
  //     staleTime: 1000 * 60 * 5,
  //     enabled: !!postList,
  //   })),
  // });

  // const combinedData = useMemo(() => {
  //   if (!postList) return [];

  //   return postList.map((summaryPost) => {
  //     const detailData = detailQueries.find(
  //       (q) => q.data?.id === summaryPost.id
  //     )?.data;
  //     return {
  //       id: summaryPost.id!,
  //       title: summaryPost.title!,
  //       imageUrl: summaryPost.imageUrl!,
  //       category: summaryPost.category!,
  //       endAt: summaryPost.endAt!,
  //       applicantNum: summaryPost.applicantNum!,
  //       capacity: detailData?.capacity,
  //       totalAvgScore: detailData?.totalAvgScore,
  //     } as MyActivityPost;
  //   });
  // }, [postList, detailQueries]);

  // const isDetailLoading = detailQueries.some((q) => q.isLoading);
  // const isDetailError = detailQueries.some((q) => q.isError);
  // const detailErrors = detailQueries
  //   .filter((q) => q.isError)
  //   .map((q) => q.error);

  // return {
  //   data: combinedData,
  //   isLoading: isListLoading || isDetailLoading,
  //   isError: isListError || isDetailError,
  //   error: listError || detailErrors[0],
  // };
};
