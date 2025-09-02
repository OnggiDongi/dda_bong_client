'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { privateClient as client } from '@/lib/openapi-client';

import ApplyHeader from '@/components/apply/ApplyHeader';
import ApplyBody from '@/components/apply/ApplyBody';
import ApplyReview from '@/components/apply/review/ApplyReview';
import ApplyFooter from '@/components/apply/ApplyFooter';

export type Review = {
  id: number;
  userName: string;
  profileImage: string | null;
  rate: number;
  comment: string;
};

export type DetailedActivityPost = {
  id: number;
  title: string;
  content: string;
  date: string;
  time: string;
  category: string;
  institutionName: string;
  institutionPhoneNumber: string;
  capacity: number;
  location: string;
  imageUrl: string;
  totalAvgScore: number;
  reviews: Review[];
  dday: string;
  isLiked?: boolean; // Used for optimistic update
};

export default function VolunteerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const queryKey = ['activityPost', id];

  // State to track if the user has successfully applied
  const [hasApplied, setHasApplied] = useState(false);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<DetailedActivityPost>({
    queryKey,
    queryFn: async () => {
      const { data, error } = await client.GET('/posts/{activityPostId}', {
        params: { path: { activityPostId: Number(id) } },
      });
      if (error) throw error;
      return data as DetailedActivityPost; // Cast to our defined type
    },
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: () =>
      client.POST('/posts/{activityPostId}/like', {
        params: { path: { activityPostId: Number(id) } },
      }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousPost = queryClient.getQueryData<DetailedActivityPost>(queryKey);
      if (previousPost) {
        // Optimistically update to the new state
        queryClient.setQueryData(queryKey, {
          ...previousPost,
          isLiked: !previousPost.isLiked,
        });
      }
      return { previousPost };
    },
    onError: (err, variables, context) => {
      // Rollback to the previous state on error
      if (context?.previousPost) {
        queryClient.setQueryData(queryKey, context.previousPost);
      }
      alert('찜 상태 변경에 실패했습니다.');
    },
    // By removing onSettled, we prevent the optimistic update from being overwritten
  });

  const applyMutation = useMutation({
    mutationFn: () =>
      client.POST('/posts/{activityPostId}/apply', {
        params: { path: { activityPostId: Number(id) } },
      }),
    onSuccess: () => {
      setHasApplied(true);
      alert('봉사활동 신청이 완료되었습니다.');
    },
    onError: (err: any) => {
      // More specific error handling
      const errorMessage = err.message || '봉사활동 신청에 실패했습니다.';
      alert(errorMessage);
    },
  });

  if (isLoading) {
    return (
      <main className='flex h-dvh flex-col bg-white'>
        <ApplyHeader />
        <div className='flex-1 flex items-center justify-center'>로딩 중...</div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className='flex h-dvh flex-col bg-white'>
        <ApplyHeader />
        <div className='flex-1 flex items-center justify-center'>
          데이터를 불러오는 데 실패했습니다.
        </div>
      </main>
    );
  }

  return (
    <main className='flex h-dvh flex-col bg-white'>
      <ApplyHeader />
      <div className='flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <ApplyBody post={post} />
        <ApplyReview reviews={post.reviews} totalAvgScore={post.totalAvgScore} />
      </div>
      <ApplyFooter
        isApply={true}
        postTitle={post.title}
        onLike={likeMutation.mutate}
        onApply={applyMutation.mutate}
        isLiked={post.isLiked}
        hasApplied={hasApplied}
        isApplying={applyMutation.isPending}
      />
    </main>
  );
}