'use client';

import Image from 'next/image';
import Txt from '@/components/atoms/Text';

export default function Header() {
  return (
    <header className='flex flex-row items-center gap-4 pt-10 pb-8'>
      <Image src='/icons/ic_logo.svg' alt='따봉 로고' width={110} height={50} />
      <div className='pt-4'>
        <Txt className='text-Modal-font block text-sm'>
          당신의 따봉 하나, 세상에 온기 하나
        </Txt>
      </div>
    </header>
  );
}
