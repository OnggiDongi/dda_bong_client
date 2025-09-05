import type { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

export interface MyActivityPost {
  id: number;
  title: string;
  imageUrl: string;
  category: components['schemas']['ActivityResponseDTO']['category'];
  applicantNum: number;
  capacity: number;
  totalAvgScore?: number;
  endAt: string;
}

const getMyActivityPosts = async (
  isRecruiting: boolean
): Promise<MyActivityPost[]> => {
  const { data, error } = await privateClient.GET('/posts/myposts', {
    params: {
      query: {
        isRecruting: isRecruiting,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data as MyActivityPost[];
};

export const useGetMyActivityPosts = (isRecruiting: boolean) => {
  return useQuery<MyActivityPost[], Error>({
    queryKey: ['myActivityPosts', isRecruiting],
    queryFn: () => getMyActivityPosts(isRecruiting),
    staleTime: 1000 * 60 * 5,
  });
};
