'use client';

import { useState } from 'react';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';
import MyReviewCard from '@/components/myreview/MyReviewCard';

const mockReviewsData = [
  {
    id: 1,
    category: '농어촌',
    title: '따봉마을 경로당 봉사',
    date: '2024.07.28',
    rating: 4.8,
    imageUrl: '/images/test1.png',
    content:
      '어르신들과 함께 즐거운 시간을 보냈습니다. 다음에도 꼭 참여하고 싶어요!',
  },
  {
    id: 2,
    category: '아동',
    title: '따봉 초등학교 미술 교육',
    date: '2024.07.20',
    rating: 3.2,
    imageUrl: '/images/test2.png',
    content: '아이들이 너무 귀여웠고, 보람찬 하루였습니다.',
  },
];

export default function MyReviewPage() {
  const [reviews, setReviews] = useState(mockReviewsData);

  const handleDelete = async (id: number) => {
    // try {
    //   // api
    //   const response = await fetch(`~~`, {
    //     method: 'DELETE',
    //   });
    //   // 화면에서도 삭제
    //   if (response.ok) {
    //     setReviews((prev) => prev.filter((r) => r.id !== id));
    //     console.log('리뷰가 성공적으로 삭제되었습니다.');
    //   } else {
    //     console.error('리뷰 삭제에 실패했습니다.');
    //     alert('리뷰 삭제에 실패했습니다.');
    //   }
    // } catch (error) {
    //   console.error('삭제 중 네트워크 오류가 발생했습니다:', error);
    //   alert('삭제 중 오류가 발생했습니다.');
    // }
  };

  return (
    <div className='flex h-screen flex-col'>
      <TopBar title='봉사 후기' />
      <main className='mt-2 flex flex-1 flex-col bg-white'>
        <div className='flex items-baseline gap-2 pt-[22px] pb-[14px] pl-[23px]'>
          <Txt weight='semibold' className='text-Hana-Black text-[22px]'>
            나의 후기
          </Txt>
          <Txt className='text-Modal-font text-[22px]'>{reviews.length}개</Txt>
        </div>

        {reviews.length > 0 ? (
          <div className='divide-y divide-[#E9ECEF] border-b'>
            {reviews.map((review) => (
              <MyReviewCard
                key={review.id}
                category={review.category}
                title={review.title}
                date={review.date}
                rating={review.rating}
                imageUrl={review.imageUrl}
                content={review.content}
                onDelete={() => handleDelete(review.id)}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-1 items-center justify-center'>
            <Txt className='text-Modal-font font-AppleSDGothicNeoM00 text-[22px]'>
              작성한 후기가 없습니다
            </Txt>
          </div>
        )}
      </main>
    </div>
  );
}
