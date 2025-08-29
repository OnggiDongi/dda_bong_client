'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';
import Modal from '@/components/atoms/modal';
import ReviewListCard from '@/components/review/ReviewList';
import TabButton from '@/components/review/TabButton';

type Tab = 'apply' | 'history';

type BaseItem = {
  id: string;
  title: string;
  date: string; // YYYY.MM.DD
  place: string;
  category: string;
  approve?: '승인 대기' | '승인 반려' | '승인 완료';
  image?: string;
};

export default function SeniorReviewListPage() {
  const [activeTab, setActiveTab] = useState<Tab>('apply');
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);

  // 데모 데이터 (실서버 연동 시 fetch로 대체)
  const applyList: BaseItem[] = useMemo(
    () => [
      {
        id: '1', // ← id 필수
        title: '뿅뿅빵',
        date: '2025.09.16',
        place: '강원도 안목해변',
        category: '환경',
        approve: '승인 대기',
        image: '/images/test1.png',
      },
      {
        id: '2',
        title: '하나도서관 책 정리하기',
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
        // image: '/images/test3.png',
      },
    ],
    []
  );

  const historyList: BaseItem[] = useMemo(
    () => [
      {
        id: 'h1',
        title: '남자들이랑 놀기',
        date: '2025.08.11',
        place: '서울 송파구',
        category: '환경',
        // image: '/images/h1.png',
      },
      {
        id: 'h2',
        title: '수비 이따까라',
        date: '2025.08.04',
        place: '인천 서구',
        category: '행정',
        // image: '/images/h2.png',
      },
    ],
    []
  );

  const list = activeTab === 'apply' ? applyList : historyList;
  const handleConfirmCancel = () => {
    if (!cancelTargetId) return;
    // TODO: 여기에서 실제 취소 API 호출
    console.log('cancel', cancelTargetId);
    setCancelTargetId(null); // 닫기
  };

  return (
    <main className='flex flex-col items-center gap-4 px-6'>
      <TopBar title='봉사 후기 작성' bgColor='bg-page-background' />

      <TabButton activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'history' && (
        <section className='border-Logo-Mint flex h-[130px] w-[350px] items-center justify-center rounded-2xl border bg-white'>
          <div className='flex flex-col justify-center pr-11'>
            <Txt weight='bold' className='text-[22px]'>
              누적 봉사시간
            </Txt>
            <Txt weight='heavy' className='text-Logo-Mint text-[22px]'>
              57시간
            </Txt>
          </div>
          <Image
            src={'/icons/ic_bigstarSong.svg'}
            alt={'누적봉사시간 별송이'}
            width={130}
            height={130}
            className='pb-0.5'
          />
        </section>
      )}

      {/* 리스트: 새 컴포넌트 ReviewListCard만 사용 */}
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

                      onClick: (id) => setCancelTargetId(String(id)), // ✅ 모달 오픈
                    }
                  : {
                      label: '리뷰 작성',
                      color: 'green',
                      onClick: () => alert('review'),
                    }
              }
            />
          );
        })}
      </section>
      {cancelTargetId && (
        <Modal
          title='신청 취소 확인'
          description='해당 봉사를 취소하시겠습니까?'
          onCancel={() => setCancelTargetId(null)}
          onConfirm={handleConfirmCancel}
          cancelText='아니오'
          confirmText='네'
          confirmColor='pink'
        />
      )}
    </main>
  );
}
