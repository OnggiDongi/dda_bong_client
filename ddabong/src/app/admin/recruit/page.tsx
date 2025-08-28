'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RecruitmentCard, {
  RecruitmentPost,
} from '@/components/admin/recruit/RecruitmentCard';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';

const mockPosts: RecruitmentPost[] = [
  {
    id: 1,
    title: '따봉 도서관에서 어린이들에게 책 읽어주기',
    status: 'recruiting',
    applicants: 5,
    capacity: 10,
  },
  {
    id: 2,
    title: '하나 공원에서 쓰레기 줍기',
    status: 'recruiting',
    applicants: 8,
    capacity: 20,
  },
  {
    id: 3,
    title: '어르신들께 스마트폰 사용법 알려드리기',
    status: 'finished',
    applicants: 5,
    capacity: 5,
  },
];

export default function RecruitPage() {
  const router = useRouter();
  const hasPosts = mockPosts.length > 0;

  const handleEdit = (id: number) => {
    router.push(`/admin/recruit/write/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log('Delete post with id:', id);
  };

  return (
    <div className='bg-Page-Background relative flex h-screen w-full flex-col'>
      <header className='relative flex items-center justify-center bg-white'>
        <Link href='/admin/home' className='absolute start-0 ml-[19px]'>
          <Image
            src='/icons/ic_arrow_back.svg'
            alt='뒤로가기'
            width={10}
            height={20}
          />
        </Link>
        <Txt weight='bold' className='text-Hana-Black py-4 text-xl'>
          모집 공고 관리
        </Txt>
      </header>

      <div className='flex-1 overflow-y-auto p-4'>
        {hasPosts ? (
          <div className='flex flex-col gap-4'>
            {mockPosts.map((post) => (
              <RecruitmentCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center'>
            <Txt className='text-Modal-font'>등록된 봉사내역이 없습니다</Txt>
            <Link href='/admin/register' className='mt-4'>
              <Button color='green' className='w-full'>
                등록하러 가기
              </Button>
            </Link>
          </div>
        )}
      </div>

      {hasPosts && (
        <Link href='/admin/recruit/write'>
          <div className='bg-Hana-Green absolute right-8 bottom-8 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-lg'>
            <Image
              src='/icons/ic_plus.svg'
              alt='새 공고 작성'
              width={24}
              height={24}
            />
          </div>
        </Link>
      )}
    </div>
  );
}
