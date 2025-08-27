'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Txt from '@/components/atoms/Text';

export default function RecruitHeader() {
  const router = useRouter();

  return (
    <div className='relative flex items-center justify-between px-4 pt-2 pb-4'>
      <button type='button' onClick={() => router.back()} aria-label='뒤로가기'>
        <Image
          src='/icons/ic_close.svg'
          alt='뒤로가기'
          width={20}
          height={20}
        />
      </button>

      <Txt className='absolute left-1/2 -translate-x-1/2 text-xl'>
        봉사 모집하기
      </Txt>
    </div>
  );
}
