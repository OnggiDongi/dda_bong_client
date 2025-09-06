'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { UseAxiosWithAuth } from '@/hooks/axios/useAxiosWithAuth';
import { useParams } from 'next/dist/client/components/navigation';
import { useEffect, useState } from 'react';
import ReviewForm from '@/components/ReviewForm';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

// TODO: 추후 데이터 연결
// const mock = {
//   '1': {
//     userName: '겨니',
//     category: '환경',
//     title: '초등학생 놀아주기 봉사',
//     date: '2025.08.09(화)',
//     location: '서울 마포구',
//   },
//   '2': {
//     userName: '비니',
//     category: '행정',
//     title: '하나도서관 책 정리하기',
//     date: '2025.09.08(월)',
//     location: '서울 중구 하나도서관',
//   },
// } as const;

type Data = {
  userName: string;
  category: string;
  title: string;
  date: string;
  location: string;
};

export default function SeniorReviewWritePage() {
  const { showToast } = useToast();
  const { id } = useParams<{ id: string }>();
  // const [activityId, setActivityId] = useState<number | null>(null);
  const [data, setData] = useState<Data>({
    userName: '',
    category: '',
    title: '',
    date: '',
    location: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const axiosAuth = UseAxiosWithAuth();
        const res = await axiosAuth.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
        );

        const data = res.data;
        const result: Data = {
          userName: (localStorage.getItem('name') || '알 수 없음') + '님',
          category: data.category ?? '',
          title: data.title ?? '',
          date: data.date ?? '',
          location: data.location ?? '',
        };

        setData(result);
        // setActivityId(data.id);
      } catch {
        showToast('봉사정보를 불러오지 못했습니다.', 'error');
      }
    })();
  }, [id, showToast]);

  return (
    <>
      <main className='flex min-h-screen flex-col'>
        <TopBar title='봉사 후기 작성' />

        <section className='bg-white px-[26px] py-[15px]'>
          <div className='border-Box-Line w-full border-b pb-2'>
            <Txt className='text-[22px]'>{data.userName}</Txt>
          </div>

          <div className='flex items-center justify-between pt-[11px] pb-[7px]'>
            <Txt className='text-xl'>{data.title}</Txt>
            <Badge text={data.category} />
          </div>

          <Txt className='text-Icon-Detail text-lg'>
            {data.date}
            <br />
          </Txt>
          <Txt className='text-Icon-Detail text-lg'>{data.location}</Txt>
        </section>

        <ReviewForm activityPostId={Number(id)} />
      </main>
    </>
  );
}
