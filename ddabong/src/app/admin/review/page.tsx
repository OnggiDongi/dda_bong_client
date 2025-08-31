'use client';

import { useState } from 'react';
import VolunList from '@/components/admin/review/VolunList';
import TopBar from '@/components/atoms/TopBar';
import TabButton from '@/components/review/TabButton';

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

  return (
    <main className='flex flex-col items-center gap-5'>
      <TopBar title='모집 봉사 이력' />

      <TabButton
        activeTab={activeTab}
        onChange={setActiveTab}
        labels={{ apply: '모집중인 공고', history: '지난내역' }}
      />

      {activeTab === 'apply' ? (
        <section className='w-full space-y-0.5'>
          {recruiting.map((r) => (
            <VolunList
              mode={activeTab}
              key={r.id}
              id={r.id}
              title={r.title}
              date={r.date}
              category={r.category}
              imageUrl={r.imageUrl}
              recruitNum={r.recruitNum}
              applicantsNum={r.applicantsNum}
              rating={r.rating}
            />
          ))}
        </section>
      ) : (
        <section className='w-full space-y-0.5'>
          {history.map((h) => (
            <VolunList
              mode={activeTab}
              key={h.id}
              id={h.id}
              title={h.title}
              date={h.date}
              category={h.category}
              imageUrl={h.imageUrl}
              rating={h.rating}
            />
          ))}
        </section>
      )}
    </main>
  );
}
