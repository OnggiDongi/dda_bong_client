'use client';

import { useApplicantInfo } from '@/hooks/volunteer/applicants';
import Image from 'next/image';
import { use } from 'react';
import UserInfo from '@/components/admin/volunteer/UserInfo';
import UserReviewList from '@/components/admin/volunteer/UserReviewList';
import UserReviewStarRating from '@/components/admin/volunteer/UserReviewStarRating';
import TopBar from '@/components/atoms/TopBar';
import AiReview from '@/components/users/AiReview';

export default function ApplicantsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = use(params);
  const idNumber = parseInt(param.id, 10);

  const { data, isLoading, error } = useApplicantInfo(idNumber);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Image
          src='/video/loading.gif'
          alt='로딩 중'
          width={130}
          height={130}
          unoptimized
        />
      </div>
    );
  }
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
      />
      <AiReview text={data.reviewSummary ?? '아직 AI 리뷰가 없어요!'} />
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
