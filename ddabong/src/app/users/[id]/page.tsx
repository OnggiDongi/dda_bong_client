'use client';

import { useApplicantInfo } from '@/hooks/volunteer/applicants';
import { use } from 'react';
import UserInfo from '@/components/admin/volunteer/UserInfo';
import UserReviewList from '@/components/admin/volunteer/UserReviewList';
import UserReviewStarRating from '@/components/admin/volunteer/UserReviewStarRating';
import TopBar from '@/components/atoms/TopBar';

export default function ApplicantsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = use(params);
  const idNumber = parseInt(param.id, 10);

  const { data, isLoading, error } = useApplicantInfo(idNumber);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러가 발생했습니다.</p>;
  if (!data) return <p>데이터가 없습니다.</p>;

  const formattedReviews =
    data.userReviews?.map((review) => ({
      id: review.id ?? 0,
      title: review.activityTitle ?? '',
      category: review.activityCategory ?? '',
      endDate: review.activityEndAt ?? '',
      imageUrl: review.activityImage ?? '',
      totalRate: review.totalRate ?? 0,
      diligenceLevel: review.diligenceLevel ?? 0,
      attitude: review.attitude ?? 0,
      healthStatus: review.healthStatus ?? 0,
      content: review.memo ?? '',
    })) ?? [];

  return (
    <div>
      <TopBar title='프로필'></TopBar>
      <UserInfo
        userName={data.userName ?? '초수비'}
        birthDate={data.birthDate ?? '1965.09.05'}
        phoneNumber={data.phoneNumber ?? '010-1234-1234'}
        profileImage={
          data.profileImage ??
          'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg'
        }
        preferredCategory={data.preferredCategory ?? '농어촌'}
        aiReview={'피그마를 잘해요. 마라샹궈를 좋아해요'} // TODO : AI 연결하기
      />
      <UserReviewStarRating
        totalRate={data.totalGrade ?? 4.0}
        diligenceLevel={data.diligenceLevel ?? 4.0}
        healthStatus={data.healthStatus ?? 4.0}
        attitude={data.attitude ?? 4.0}
      />

      <UserReviewList
        count={formattedReviews.length}
        userName={data.userName ?? '초수비'}
        reviews={formattedReviews}
      />
    </div>
  );
}
