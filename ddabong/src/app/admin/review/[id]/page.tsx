// 봉사자 목록
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ActivityApplyInfo from '@/components/admin/volunteer/ActivityApplyInfo';
import VolunteerReview from '@/components/admin/volunteer/VolunteerReview';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

// 봉사자 목록

type Review = {
  id: number;
  userId: number;
  userName: string;
  imageUrl: string;
  totalRate: number | null;
  diligenceLevel: number | null;
  attitude: number | null;
  healthStatus: number | null;
  hasMyReview: boolean;
  aiReview: string | null;
};

const id = 1;
const initialReviews: Review[] = [
  {
    id: 1,
    userId: 1,
    userName: '초비',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg',
    totalRate: 4.0,
    diligenceLevel: 4.0,
    attitude: 4.0,
    healthStatus: 4.0,
    hasMyReview: true,
    aiReview: '피그마를 잘해요. 마라샹궈를 좋아해요. 야미야미 맛있거등여 냠',
  },
  {
    id: 2,
    userId: 2,
    userName: '김보개미',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김보개미.png',
    totalRate: 1.2,
    diligenceLevel: 1.0,
    attitude: 1.0,
    healthStatus: 1.0,
    hasMyReview: true,
    aiReview: '다리가 불편해보여요. 정신 사나워요. 물릴 수 있으니 조심!',
  },
  {
    id: 3,
    userId: 3,
    userName: '이짐',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg',
    totalRate: 4.5,
    diligenceLevel: 4.0,
    attitude: 5.0,
    healthStatus: 5.0,
    hasMyReview: false,
    aiReview: '짐이 많아요. 우산 키링을 좋아해요. 볼링을 잘쳐요 스트라이크~!',
  },
  {
    id: 4,
    userId: 4,
    userName: '기여니피그',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김태희.png',
    totalRate: 5.0,
    diligenceLevel: 5.0,
    attitude: 5.0,
    healthStatus: 5.0,
    hasMyReview: true,
    aiReview:
      '외계어를 해요. 4차원이에요. 꾸잉꾸잉삐요 소리를 내고 안경을 써요.',
  },
  {
    id: 5,
    userId: 5,
    userName: '비버',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/비버.png',
    totalRate: null,
    diligenceLevel: null,
    attitude: null,
    healthStatus: null,
    hasMyReview: true,
    aiReview: null,
  },
];

export default function RecruitVolunteerListPage() {
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // 제출 후 돌아올 때 /admin/recruit/list?done=1&id=5 같은 식으로 푸시한다고 가정
  const done = searchParams.get('done');
  const reviewedId = Number(searchParams.get('id'));

  useEffect(() => {
    if (done === '1' && !Number.isNaN(reviewedId)) {
      // 해당 id의 항목을 "평가완료" 상태로 만들기: 평점 중 하나라도 숫자로 채우면 됨
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewedId
            ? {
                ...r,
                totalRate: r.totalRate ?? 5, // 혹은 서버 응답값으로 교체
                diligenceLevel: r.diligenceLevel ?? 5,
                attitude: r.attitude ?? 5,
                healthStatus: r.healthStatus ?? 5,
              }
            : r
        )
      );
    }
  }, [done, reviewedId]);

  return (
    <div className='flex flex-col'>
      <TopBar title='봉사자 목록' />
      <ActivityApplyInfo
        title='미녀들이랑 노는 봉사'
        endDate='2025.09.01'
        category='농어촌'
        imageUrl='https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/미녀들.jpg'
        recruitNum={10}
        applicantsNum={8}
      />

      <div>
        {reviews.length ? (
          reviews.map((user) => (
            <VolunteerReview
              key={user.id}
              userName={user.userName}
              imageUrl={user.imageUrl}
              totalRate={user.totalRate}
              diligenceLevel={user.diligenceLevel}
              attitude={user.attitude}
              healthStatus={user.healthStatus}
              hasMyReview={user.hasMyReview}
              aiReview={user.aiReview}
              evaluateHref={`/admin/review/${id}/${user.userId}`}
            />
          ))
        ) : (
          <div className='mt-1 flex min-h-[64vh] flex-col items-center justify-center bg-white'>
            <Txt weight='medium' className='text-Modal-font'>
              글이 없습니다.
            </Txt>
          </div>
        )}
      </div>
    </div>
  );
}
