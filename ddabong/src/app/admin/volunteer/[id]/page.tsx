'use client';

// (특정 봉사) 지원자 목록
import { useApplicants } from '@/hooks/queries/useGetApplicants';
import { components } from '@/types/openapi';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ActivityReview from '@/components/ActivityReview';
import ActivityApplyInfo from '@/components/admin/volunteer/ActivityApplyInfo';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

type ApplicantReviewResponseDTO =
  components['schemas']['ApplicantReviewResponseDTO'];

interface ApplicantReviewResponseDTOWithUserId
  extends ApplicantReviewResponseDTO {
  userId?: number;
}

function VolunteerListContent({ postId }: { postId: number }) {
  const { data: applicantsData, isLoading, isFetching } = useApplicants(postId);

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

  if (!applicantsData) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

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

  if (isError) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Txt className='text-Modal-font text-lg'>
          데이터를 불러오지 못했습니다.
        </Txt>
      </div>
    );
  }
  return (
    <>
      <div className='flex flex-col'>
        <TopBar title='지원자 목록'></TopBar>
        <ActivityApplyInfo
          title={applicantsData.title ?? ''}
          endDate={applicantsData.endAt ?? ''}
          category={applicantsData.category ?? ''}
          imageUrl={applicantsData.imageUrl ?? ''}
          recruitNum={applicantsData.capacity ?? 0}
          applicants={applicantsData.reviews ?? []}
        />
        <div>
          {applicantsData.reviews && applicantsData.reviews.length != 0 ? (
            applicantsData.reviews.map((user) => (
              <ActivityReview
                key={user.id}
                id={user.id ?? 0}
                userId={
                  (user as ApplicantReviewResponseDTOWithUserId).userId ?? 0
                }
                activityPostId={postId}
                userName={user.name ?? ''}
                imageUrl={user.profileImage ?? ''}
                totalRate={user.rate ?? null}
                diligenceLevel={user.diligenceLevel ?? null}
                attitude={user.attitude ?? null}
                healthStatus={user.healthStatus ?? null}
                status={user.status ?? ''}
                aiReview={user.aiComment ?? '기연담당ai'}
              />
            ))
          ) : (
            <div className='flex min-h-screen items-center justify-center'>
              <Txt />
              지원자가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function VolunteerListPage() {
  const params = useParams();
  const postId = params.id ? Number(params.id) : null;

  if (postId === null) {
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

  return <VolunteerListContent postId={postId} />;
}
