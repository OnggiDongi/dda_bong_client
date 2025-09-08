'use client';

import { useGetActivityPostById } from '@/hooks/api/useGetActivityPostById';
import { useGetApplicantById } from '@/hooks/api/useGetApplicantById';
import ReviewForm from '@/components/ReviewForm';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';
import Header from '@/components/atoms/TopBar';

type Props = {
  params: { id: string; userId: string };
};

export default function Page({ params: { id, userId } }: Props) {
  const {
    data: activityPost,
    isLoading: isLoadingPost,
    isError: isErrorPost,
  } = useGetActivityPostById(Number(id));
  const {
    data: applicant,
    isLoading: isLoadingApplicant,
    isError: isErrorApplicant,
  } = useGetApplicantById(Number(userId));

  if (isLoadingPost || isLoadingApplicant) {
    return <div>Loading...</div>;
  }

  if (isErrorPost || !activityPost || isErrorApplicant || !applicant) {
    return <div>Error loading data.</div>;
  }

  return (
    <main className='flex min-h-screen flex-col'>
      <Header title='봉사자 평가' />
      <section className='bg-white px-[26px] py-[15px]'>
        <div className='border-Box-Line w-full border-b pb-2'>
          <Txt className='text-[22px]'>{applicant.userName}님</Txt>
        </div>
        <div className='flex items-center justify-between pt-[11px] pb-[7px]'>
          <Txt className='text-xl'>{activityPost.title}</Txt>
          <Badge text={activityPost.category || ''} />
        </div>
        <Txt className='text-Icon-Detail text-lg'>
          {activityPost.startDate}
          <br />
        </Txt>
        <Txt className='text-Icon-Detail text-lg'>{activityPost.location}</Txt>
      </section>
      <ReviewForm
        activityPostId={Number(id)}
        variant='admin'
        userId={Number(userId)}
      />
    </main>
  );
}
