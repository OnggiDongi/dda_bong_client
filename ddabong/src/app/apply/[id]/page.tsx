'use client';

import { fetchDetailedActivityPost } from '@/hooks/apply/activity';
import {
  useApplyActivityMutation,
  useLikeActivityMutation,
} from '@/hooks/mutations/useActivityMutations';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
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

export default function VolunteerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const postId = Number(id);
  const queryKey = ['activityPost', id];

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<DetailedActivityPost>({
    queryKey,
    queryFn: () => fetchDetailedActivityPost(postId),
    enabled: !!id,
  });

  const likeMutation = useLikeActivityMutation(postId, queryKey);
  const applyMutation = useApplyActivityMutation(postId, queryKey);

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
        dday={post.dday}
        onLike={likeMutation.mutate}
        onApply={applyMutation.mutate}
        isLiked={post.isLiked}
        hasApplied={post.isApplied}
        isApplying={applyMutation.isPending}
      />
    </main>
  );
}
