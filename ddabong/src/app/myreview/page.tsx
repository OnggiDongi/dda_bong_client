'use client';

import { useMyReview } from '@/hooks/myreview/myreview';
import { useDeleteReview } from '@/hooks/myreview/useDeleteReview';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';
import MyReviewCard from '@/components/myreview/MyReviewCard';

export default function MyReviewPage() {
  const { data: review, isLoading, error } = useMyReview();
  const { mutate: deleteReview } = useDeleteReview();

  const handleDelete = async (id: number) => {
    deleteReview(id);
  };

  if (isLoading) {
    return <Txt>로딩 중…</Txt>;
  }

  if (error) {
    return <Txt>오류가 발생했습니다.</Txt>;
  }
  return (
    <div className='flex h-screen flex-col'>
      <TopBar title='봉사 후기' />
      <main className='mt-2 flex flex-1 flex-col bg-white'>
        <div className='flex items-baseline gap-2 pt-[22px] pb-[14px] pl-[23px]'>
          <Txt weight='semibold' className='text-Hana-Black text-[22px]'>
            나의 후기
          </Txt>
          <Txt className='text-Modal-font text-[22px]'>
            {(review ?? []).length}개
          </Txt>
        </div>

        {(review ?? []).length > 0 ? (
          <div className='divide-y divide-[#E9ECEF] border-b'>
            {(review ?? []).map((review) => (
              <MyReviewCard
                key={review.id}
                category={review.category || ''}
                title={review.activityTitle || ''}
                date={review.createdAt || ''}
                rating={review.rate || ''}
                imageUrl={review.imageUrl || ''}
                content={review.content || ''}
                onDelete={() => review.id && handleDelete(review.id)}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-1 items-center justify-center'>
            <Txt className='text-Modal-font text-[22px]' weight='medium'>
              작성한 후기가 없습니다
            </Txt>
          </div>
        )}
      </main>
    </div>
  );
}
