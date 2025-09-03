'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { components } from '@/types/openapi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { privateClient as client } from '@/lib/openapi-client';
// Import components for type usage

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
  isLiked?: boolean;
  isApplied?: boolean;
};

// Define the type for the list items, which is used in likes and history
type ActivityPostListItem = components['schemas']['ActivityPostResponseDTO'];

export default function VolunteerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const postId = Number(id);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const queryKey = ['activityPost', id];

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<DetailedActivityPost>({
    queryKey,
    queryFn: async () => {
      const [postRes, likedRes, historyRes] = await Promise.all([
        client.GET('/posts/{activityPostId}', {
          params: { path: { activityPostId: postId } },
        }),
        client.GET('/users/likes'),
        client.GET('/users/history'),
      ]);

      if (postRes.error) throw postRes.error;

      const postData = postRes.data as DetailedActivityPost;

      // Use the correct type for the items in the list
      const isLiked =
        likedRes.data?.some((p: ActivityPostListItem) => p.id === postId) ||
        false;
      const isApplied =
        historyRes.data?.some((p: ActivityPostListItem) => p.id === postId) ||
        false;

      return { ...postData, isLiked, isApplied };
    },
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: () =>
      client.POST('/posts/{activityPostId}/like', {
        params: { path: { activityPostId: postId } },
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
      }
      return { previousPost };
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(queryKey, context.previousPost);
      }
      showToast(
        '찜 상태 변경에 실패했습니다. 로그인 상태를 확인해주세요.',
        'error'
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/users/likes'] });
    },
  });

  const applyMutation = useMutation({
    mutationFn: () =>
      client.POST('/posts/{activityPostId}/apply', {
        params: { path: { activityPostId: postId } },
      }),
    onSuccess: () => {
      // Update the cache with the correct type
      queryClient.setQueryData<DetailedActivityPost | undefined>(
        queryKey,
        (oldData) => (oldData ? { ...oldData, isApplied: true } : undefined)
      );
      showToast('봉사활동 신청이 완료되었습니다.', 'success');
    },
    onError: (err: Error) => {
      showToast(
        err.message ||
          '봉사활동 신청에 실패했습니다. 로그인 상태를 확인해주세요.',
        'error'
      );
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
        hasApplied={post.isApplied}
        isApplying={applyMutation.isPending}
      />
    </main>
  );
}
