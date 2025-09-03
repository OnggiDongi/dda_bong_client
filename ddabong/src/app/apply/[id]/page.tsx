'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState, useReducer } from 'react';
import { privateClient as client } from '@/lib/openapi-client';
import ApplyBody from '@/components/apply/ApplyBody';
import ApplyFooter from '@/components/apply/ApplyFooter';
import ApplyHeader from '@/components/apply/ApplyHeader';
import ApplyReview from '@/components/apply/review/ApplyReview';

export type Review = {
  id: number;
  userName: string;
  profileImage: string;
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
  const { showToast } = useToast();

  const [hasApplied, setHasApplied] = useState(false);
  const [_, forceRerender] = useReducer((x) => x + 1, 0);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<DetailedActivityPost>({
    queryKey,
    queryFn: async () => {
      // All requests now use the private client, aliased as client
      const { data, error } = await client.GET('/posts/{activityPostId}', {
        params: { path: { activityPostId: Number(id) } },
      });
      if (error) throw error;
      return data as DetailedActivityPost;
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
      const previousPost =
        queryClient.getQueryData<DetailedActivityPost>(queryKey);
      if (previousPost) {
        queryClient.setQueryData(queryKey, {
          ...previousPost,
          isLiked: !previousPost.isLiked,
        });
        forceRerender();
      }
      return { previousPost };
    },
    onError: (err: Error, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(queryKey, context.previousPost);
        forceRerender();
      }
      showToast('찜 상태 변경에 실패했습니다. 로그인 상태를 확인해주세요.');
    },
  });

  const applyMutation = useMutation({
    mutationFn: () =>
      client.POST('/posts/{activityPostId}/apply', {
        params: { path: { activityPostId: Number(id) } },
      }),
    onSuccess: () => {
      setHasApplied(true);
      showToast('신청이 완료되었습니다.');
    },
    onError: (err: Error) => {
      const errorMessage =
        err.message ||
        '봉사활동 신청에 실패했습니다. 로그인 상태를 확인해주세요.';

      showToast(errorMessage);
    },
  });

  if (isLoading) {
    return (
      <main className='flex h-dvh flex-col bg-white'>
        <ApplyHeader />
        <div className='flex flex-1 items-center justify-center'>
          로딩 중...
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className='flex h-dvh flex-col bg-white'>
        <ApplyHeader />
        <div className='flex flex-1 items-center justify-center p-4 text-center'>
          데이터를 불러오는 데 실패했습니다. <br />
          로그인 상태를 확인하거나, 잠시 후 다시 시도해주세요.
          {error && (
            <pre className='mt-4 text-left text-xs'>
              {JSON.stringify(error, null, 2)}
            </pre>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className='flex h-dvh flex-col bg-white'>
      <ApplyHeader />
      <div className='flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <ApplyBody post={post} />
        <ApplyReview
          reviews={post.reviews}
          totalAvgScore={post.totalAvgScore}
        />
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
