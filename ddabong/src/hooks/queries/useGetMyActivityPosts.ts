import { useQuery, useQueries } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';
import type { components } from '@/types/openapi';
import { useMemo } from 'react';

// This interface now represents the COMBINED data from the list and detail endpoints.
export interface MyActivityPost {
  id: number;
  title: string;
  imageUrl: string;
  category: components['schemas']['ActivityResponseDTO']['category'];
  applicantNum: number;
  capacity?: number; // Now comes from detail, so it might not exist initially
  totalAvgScore?: number; // Comes from detail
  endAt: string;
}

type PostSummary = components['schemas']['ActivityPostResponseDTO'];
type PostDetail = components['schemas']['ActivityPostDetailResponseDTO'];

// 1. Fetches the initial list of post summaries
const getActivityPostList = async (isRecruiting: boolean): Promise<PostSummary[]> => {
  const { data, error } = await privateClient.GET('/posts/myposts', {
    params: {
      query: {
        isRecruting: isRecruiting, // Note the typo in the API spec
      },
    },
  });
  if (error) throw error;
  return data as PostSummary[];
};

// 2. Fetches the detail for a single post
const getActivityPostDetail = async (id: number): Promise<PostDetail> => {
  const { data, error } = await privateClient.GET('/posts/{id}', {
    params: {
      path: { id },
    },
  });
  if (error) throw error;
  return data as PostDetail;
};

export const useGetMyActivityPosts = (isRecruiting: boolean) => {
  // Step 1: Fetch the list of posts
  const { data: postList, isLoading: isListLoading, isError: isListError, error: listError } = useQuery<PostSummary[], Error>({
    queryKey: ['myActivityPostList', isRecruiting],
    queryFn: () => getActivityPostList(isRecruiting),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Step 2: Create a dynamic list of queries for each post detail
  const detailQueries = useQueries({
    queries: (postList || []).map((post) => ({
      queryKey: ['activityPostDetail', post.id],
      queryFn: () => getActivityPostDetail(post.id!),
      staleTime: 1000 * 60 * 5,
      enabled: !!postList, // Only run when postList is available
    })),
  });

  // Step 3: Memoize the combined data
  const combinedData = useMemo(() => {
    if (!postList) return [];

    return postList.map((summaryPost) => {
      const detailData = detailQueries.find(q => q.data?.id === summaryPost.id)?.data;
      return {
        id: summaryPost.id!,
        title: summaryPost.title!,
        imageUrl: summaryPost.imageUrl!,
        category: summaryPost.category!,
        endAt: summaryPost.endAt!,
        // Data from the list call
        applicantNum: summaryPost.applicantNum!,
        // Data from the detail calls
        capacity: detailData?.capacity,
        totalAvgScore: detailData?.totalAvgScore,
      } as MyActivityPost;
    });
  }, [postList, detailQueries]);

  const isDetailLoading = detailQueries.some((q) => q.isLoading);
  const isDetailError = detailQueries.some((q) => q.isError);
  const detailErrors = detailQueries.filter(q => q.isError).map(q => q.error);

  return {
    data: combinedData,
    isLoading: isListLoading || isDetailLoading,
    isError: isListError || isDetailError,
    error: listError || detailErrors[0],
  };
};