'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ApplyHeader() {
  const router = useRouter();

  return (
    <section className='relative flex h-[68px] w-full items-center border-b'>
      <button onClick={() => router.back()} className='absolute left-[19px]'>
        <Image
          src='/icons/ic_arrow_back.svg'
          alt='뒤로가기'
          width={10}
          height={20}
        />
      </button>

      <div className='mx-auto'>
        <div className='relative aspect-[3/2] h-[47px] w-[71px]'>
          <Image
            src='/icons/ic_logo.svg'
            alt='따봉 로고'
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
    </section>
  );
}
