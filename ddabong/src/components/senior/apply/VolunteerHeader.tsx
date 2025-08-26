'use client';

import Image from 'next/image';
import Txt from '@/components/atoms/Text';

export default function VolunteerHeader() {
  return (
    <section className='relative flex items-center justify-between'>
      <div className='flex flex-col'>
        <Txt weight='extrabold' className='text-2xl'>
          이번엔 무슨 봉사하지?
        </Txt>
        <br></br>
        <Txt
          weight='semibold'
          className='text-Hana-Black text-xl whitespace-nowrap'
        >
          관심있는 위치와 카테고리를 선택해 보세요!
        </Txt>
      </div>
      <Image
        className='absolute right-1'
        src='/icons/ic_senior.svg'
        alt='별돌이'
        width={80}
        height={80}
      />
    </section>
  );
}
