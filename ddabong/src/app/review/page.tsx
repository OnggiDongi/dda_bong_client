'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TopBar from '@/components/atoms/TopBar';
import Modal from '@/components/atoms/modal';
import ReviewListCard from '@/components/review/ReviewList';
import TabButton from '@/components/review/TabButton';
import VolunProfile from '@/components/review/VolunProfile';

type Tab = 'apply' | 'history';

type BaseItem = {
  id: string;
  title: string;
  date: string;
  place: string;
  category: string;
  approve?: '승인 대기' | '승인 반려' | '승인 완료';
  image?: string;
  reviewed?: 'true' | 'false'; //리뷰 씀 , 안 씀
};

export default function SeniorReviewListPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('apply');

  // 데이터
  const [applyList, setApplyList] = useState<BaseItem[]>([
    {
      id: '1',
      title: '뿅뿅빵',
      date: '2025.09.16',
      place: '강원도 안목해변',
      category: '환경',
      approve: '승인 대기',
      image: '/images/test1.png',
    },
    {
      id: '2',
      title: '꾸이삐이',
      date: '2025.09.08',
      place: '서울 중구 하나도서관',
      category: '행정',
      approve: '승인 반려',
      image: '/images/test2.png',
    },
    {
      id: '3',
      title: '배추 농장 봉사',
      date: '2025.09.05',
      place: '남해 비버 농장',
      category: '농어촌',
      approve: '승인 완료',
    },
  ]);

  const historyList: BaseItem[] = [
    {
      id: '1',
      title: '초등학생 놀아주기',
      date: '2025.08.09',
      place: '서울 마포구',
      category: '환경',
      reviewed: 'false',
      image: '/images/test1.png',
    },
    {
      id: '2',
      title: '수비 이따까라',
      date: '2025.08.04',
      place: '경기도 파주시',
      category: '행정',
      reviewed: 'false',
    },
    {
      id: '3',
      title: '수비 발따까라',
      date: '2025.08.04',
      place: '한울마을',
      category: '행정',
      reviewed: 'true',
    },
  ];
  const [cancelTarget, setCancelTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const list = activeTab === 'apply' ? applyList : historyList;

  const handleOpenCancelModal = (id: string) => {
    const item = applyList.find((x) => x.id === id);
    if (!item) return;
    setCancelTarget({ id, title: item.title });
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    setApplyList((prev) => prev.filter((x) => x.id !== cancelTarget.id));
    setCancelTarget(null);
  };

  return (
    <main className='bg-page-gradient flex flex-col items-center gap-4 px-6 pb-10'>
      <TopBar title='봉사 후기 작성' bgColor='bg-page-background' />

      <TabButton activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'history' && <VolunProfile></VolunProfile>}

      <section className='items-center justify-center space-y-4'>
        {list.map((item) => {
          return (
            <ReviewListCard
              key={item.id}
              id={item.id}
              mode={activeTab}
              category={item.category}
              title={item.title}
              date={item.date}
              location={item.place}
              image={item.image ?? '/icons/ic_senior.svg'}
              approve={item.approve}
              cta={
                activeTab === 'apply'
                  ? {
                      label: '신청 취소',
                      color: 'red',
                      onClick: (id) => handleOpenCancelModal(String(id)),
                    }
                  : item.reviewed === 'false'
                    ? {
                        label: '리뷰 작성',
                        color: 'green',
                        onClick: (id) => router.push(`/review/write/${id}`),
                      }
                    : undefined
              }
            />
          );
        })}
      </section>

      {activeTab === 'apply' && cancelTarget && (
        <Modal
          title={cancelTarget.title}
          description='해당 봉사를 취소하시겠습니까?'
          onCancel={() => setCancelTarget(null)}
          onConfirm={handleConfirmCancel}
          cancelText='아니오'
          confirmText='네'
          confirmColor='pink'
        />
      )}
    </main>
  );
}
