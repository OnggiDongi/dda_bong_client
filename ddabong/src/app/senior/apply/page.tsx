import CategoryController from '@/components/senior/apply/CategoryController';
import VolunteerCard from '@/components/senior/apply/VolunteerCard';
import VolunteerHeader from '@/components/senior/apply/VolunteerHeader';

//테스트 데이터
const testData = [
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
    title: '별별도서관 책 정리하기',
    date: '2025.09.08',
    location: '서울 마포구 별도서관',
    image: '/images/test2.png',
  },
  {
    id: 3,
    category: '농어촌',
    deadline: '마감 28일 남음',
    title: '남해 배추농장에서 길땐 이렇게 보여요',
    date: '2025.09.08',
    location: '경산 개미농장',
    image: '/images/test3.png',
  },
];

export default function ApplyPage() {
  return (
    <main className='bg-page-gradient flex flex-col gap-5 px-4'>
      <VolunteerHeader />
      <CategoryController />
      <section className='flex flex-col gap-4'>
        {testData.map((item) => (
          <VolunteerCard key={item.id} {...item} />
        ))}
      </section>
    </main>
  );
}
