// 모집 봉사 이력
'use client';

import { useState } from 'react';
import VolunList from '@/components/admin/review/VolunList';
import TopBar from '@/components/atoms/TopBar';
import TabButton from '@/components/review/TabButton';

// 모집 봉사 이력

type Tab = 'apply' | 'history';

export default function ReviewListPage() {
  const [activeTab, setActiveTab] = useState<Tab>('apply');

  const recruiting = [
    {
      id: 101,
      title: '미녀들이랑 노는 봉사',
      date: '2025.09.01',
      category: '농어촌',
      imageUrl: '/images/test1.png',
      recruitNum: 10,
      applicantsNum: 8,
      rating: 3.0,
    },
    {
      id: 102,
      title: '어르신 말벗 봉사',
      date: '2025.09.10',
      category: '행정',
      imageUrl: '/images/test2.png',
      recruitNum: 6,
      applicantsNum: 4,
    },
  ];

  const history = [
    {
      id: 1,
      title: '미녀들이랑 노는 봉사',
      date: '2025.09.01',
      category: '농어촌',
      imageUrl: '/images/test1.png',
      rating: 5.0,
    },
    {
      id: 2,
      title: '자만언니 깨우기 봉사',
      date: '2025.09.08',
      category: '농어촌',
      imageUrl: '/images/test3.png',
      rating: 4.0,
    },
  ];

  const list = activeTab === 'apply' ? recruiting : history;

  return (
    <main className='flex flex-col items-center gap-5'>
      <TopBar title='모집 봉사 이력' />

      <TabButton
        activeTab={activeTab}
        onChange={setActiveTab}
        labels={{ apply: '모집중인 공고', history: '지난내역' }}
      />

      <section className='w-full space-y-0.5'>
        {list.map((item) => (
          <VolunList
            key={item.id}
            mode={activeTab}
            id={item.id}
            title={item.title}
            date={item.date}
            category={item.category}
            imageUrl={item.imageUrl}
            recruitNum={
              activeTab === 'apply' && 'recruitNum' in item
                ? item.recruitNum
                : undefined
            }
            applicantsNum={
              'applicantsNum' in item ? item.applicantsNum : undefined
            }
            rating={'rating' in item ? item.rating : undefined}
          />
        ))}
      </section>
    </main>
  );
}
