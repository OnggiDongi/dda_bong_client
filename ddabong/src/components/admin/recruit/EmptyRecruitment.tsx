'use client';

import Link from 'next/link';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';

export default function EmptyRecruitment() {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <Txt weight='semibold' className='text-Hana-Black text-center text-lg'>
        등록된 봉사 활동이 없습니다.
      </Txt>
      <div className='mt-4 flex flex-col items-center'>
        <Link href='/admin/recruit/write' passHref>
          <Button
            className='h-[42px] w-[350px] rounded-[20px] bg-white'
            textClassName='text-Hana-Black text-lg'
          >
            추가하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
