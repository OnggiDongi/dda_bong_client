'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className='flex flex-col items-center pb-10'>
      <TopBar title='' />
      <section className='flex w-[402px] flex-col items-center bg-white pb-8'>
        <Image src='/icons/ic_logo.svg' alt='따봉' width={120} height={60} />
        <Txt weight='bold' className='mt-2 text-center text-xl'>
          당신의 따봉 하나, 세상에 온기 하나
        </Txt>
      </section>

      <section>
        <Image
          src='/images/about.svg'
          alt='소개 일러스트'
          width={350}
          height={220}
          // className='h-auto w-full'
        />
      </section>

      <section className='mt-2 flex w-[350px] flex-col items-center'>
        <div className='flex items-center gap-4'>
          <Image
            src='/images/bus.png'
            alt='버스'
            width={64}
            height={48}
            className='h-auto w-16'
          />
          <Image
            src='/images/snack.png'
            alt='다과'
            width={64}
            height={48}
            className='h-auto w-16'
          />
        </div>

        <Txt weight='heavy' className='mt-3 text-[20px]'>
          하나은행이 버스를 대절해 드리고
        </Txt>
        <Txt className='mt-1 text-[16px] text-[#6F7E85]'>
          활동 중에는 다과가 함께합니다 !
        </Txt>

        <Button
          color='white'
          borderColor='green'
          textClassName='text-hana-black'
          className='h-[40px] w-[170px] rounded-full'
          onClick={() => router.push('/apply')}
        >
          봉사 신청하기
        </Button>
      </section>
    </main>
  );
}
