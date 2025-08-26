'use client';

import Image from 'next/image';
import * as React from 'react';
import Txt from '@/components/atoms/Text';

export default function Category() {
  return (
    <div className='pt-[10px]'>
      <Txt weight='bold' className='text-Hana-Black pl-[30px] text-xl'>
        봉사 카테고리
      </Txt>
      <div className='relative mt-3 px-[26px]'>
        <select
          defaultValue=''
          className='border-Box-Line text-Hana-Black placeholder:text-Icon-Detail w-full appearance-none rounded-[10px] border bg-white px-4 py-3 text-[15px] focus:ring-2 focus:ring-[#00A19A] focus:outline-none'
        >
          <option value='' disabled>
            카테고리
          </option>
          <option value='환경'>환경</option>
          <option value='교육'>교육</option>
          <option value='돌봄'>돌봄</option>
          <option value='행정지원'>행정지원</option>
          <option value='기타'>기타</option>
        </select>
        <Image
          src='/icons/ic_arrow_back.svg'
          alt='드롭다운 아이콘'
          width={20}
          height={20}
          className='pointer-events-none absolute top-1/2 right-9 -translate-y-1/2'
        />
      </div>
    </div>
  );
}
