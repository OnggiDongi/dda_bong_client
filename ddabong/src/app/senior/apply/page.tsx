'use client';

import CategoryButton from '@/components/senior/apply/CategoryButton';
import VolunteerCard from '@/components/senior/apply/VolunteerCard';
import VolunteerHeader from '@/components/senior/apply/VolunteerHeader';

const mockData = [
  {
    id: 1,
    category: '환경',
    deadline: '마감 31일 남음',
    title: '동해 바다 쓰레기 줍기',
    date: '2025.09.16',
    location: '강원도 안목해변',
    image: '/images/test1.png',
  },
  {
    id: 2,
    category: '행정',
    deadline: '마감 28일 남음',
    title: '하나도서관 책 정리하기',
    date: '2025.09.08',
    location: '서울 중구 하나도서관',
    image: '/images/test2.png',
  },
];

export default function ApplyPage() {
  return (
    <main className='bg-Page-Background mx-auto max-w-[420px] p-4'>
      <VolunteerHeader />
      <section className='flex flex-col gap-3'>
        {mockData.map((item) => (
          <VolunteerCard key={item.id} {...item} />
        ))}
      </section>
    </main>
  );
}
