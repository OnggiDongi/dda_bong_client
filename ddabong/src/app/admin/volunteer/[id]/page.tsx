'use client';

// (특정 봉사) 지원자 목록
import { useApplicants } from '@/hooks/queries/useGetApplicants';
import { useParams } from 'next/navigation';
import ActivityReview from '@/components/ActivityReview';
import ActivityApplyInfo from '@/components/admin/volunteer/ActivityApplyInfo';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

export default function VolunteerListPage() {
  const params = useParams();
  const postId = Number(params.id);
  const { data: applicantsData } = useApplicants(postId);

  return (
    <>
      <div className='flex flex-col'>
        <TopBar title='지원자 목록'></TopBar>
        {applicantsData && (
          <ActivityApplyInfo
            title={applicantsData.title ?? ''}
            endDate={applicantsData.endAt ?? ''}
            category={applicantsData.category ?? ''}
            imageUrl={applicantsData.imageUrl ?? ''}
            recruitNum={applicantsData.capacity ?? 0}
            applicantsNum={applicantsData.applicantNum ?? 0}
          />
        )}
        <div>
          {applicantsData &&
          applicantsData.reviews &&
          applicantsData.reviews.length != 0 ? (
            applicantsData.reviews.map((user) => (
              <ActivityReview
                key={user.id}
                userName={user.name ?? ''}
                imageUrl={user.profileImage ?? ''}
                totalRate={user.rate ?? null}
                diligenceLevel={user.diligenceLevel ?? null}
                attitude={user.attitude ?? null}
                healthStatus={user.healthStatus ?? null}
                status={user.status ?? ''}
                aiReview={user.aiComment ?? 'ai 넣어주시길바람'}
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
    </>
  );
}
