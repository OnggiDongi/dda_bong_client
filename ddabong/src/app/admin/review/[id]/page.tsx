'use client';

import { useGetVolunteerReviewList } from '@/hooks/queries/useGetVolunteerReviewList';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ActivityApplyInfo from '@/components/admin/review/[id]/ActivityInfo';
import VolunteerReview from '@/components/admin/volunteer/VolunteerReview';
import TopBar from '@/components/atoms/TopBar';

// 봉사자 목록

function VolunteerListContent({ boardId }: { boardId: number }) {
  const { data: reviewData, isLoading, isFetching } = useGetVolunteerReviewList(boardId);

  if (isLoading || isFetching) {
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

  if (!reviewData) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  const {
    title,
    endDate,
    category,
    imageUrl,
    recruitNum,
    applicantsNum,
    volunteerList,
  } = reviewData;

  return (
    <div className='flex flex-col'>
      <TopBar title='봉사자 목록' />
      <ActivityApplyInfo
        title={title}
        endDate={endDate}
        category={category}
        imageUrl={imageUrl}
        recruitNum={recruitNum}
        applicantsNum={applicantsNum}
      />

      <div>
        {volunteerList.length ? (
          volunteerList.map((user) => (
            <VolunteerReview
              key={user.userId}
              userName={user.userName}
              imageUrl={user.imageUrl}
              totalRate={user.totalRate}
              diligenceLevel={user.diligenceLevel}
              attitude={user.attitude}
              healthStatus={user.healthStatus}
              hasMyReview={user.hasMyReview}
              aiReview={user.aiReview}
              evaluateHref={`/admin/review/${boardId}/${user.userId}`}
            />
          ))
        ) : (
          <div className='flex min-h-screen items-center justify-center'>
            <Image
              src='/video/loading.gif'
              alt='로딩 중'
              width={130}
              height={130}
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecruitVolunteerListPage() {
  const params = useParams();
  const boardId = params.id ? Number(params.id) : null;

  if (boardId === null) {
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

  return <VolunteerListContent boardId={boardId} />;
}
