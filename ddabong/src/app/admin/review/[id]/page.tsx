// 봉사자 목록
'use client';

import { useGetVolunteerReviewList } from '@/hooks/queries/useGetVolunteerReviewList';
import { useParams } from 'next/navigation';
import ActivityApplyInfo from '@/components/admin/review/[id]/ActivityInfo';
import VolunteerReview from '@/components/admin/volunteer/VolunteerReview';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

// 봉사자 목록

export default function RecruitVolunteerListPage() {
  const { id: boardId } = useParams();
  const { data: reviewData } = useGetVolunteerReviewList(Number(boardId));

  if (!reviewData) {
    return <div>Loading...</div>;
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
