'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className='flex flex-col'>
      {/* 뒤로가기 위치 맞추려고 공백 글자 추가함 */}
      <TopBar title='⠀' />
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
          width={402}
          height={421}
        />
      </section>

      <section className='bg-1Q-Green flex w-[402px] flex-col items-center'>
        <div className='flex items-center gap-2 pt-8'>
          <Image src='/icons/ic_bus.svg' alt='버스' width={80} height={80} />
          <Image src='/icons/ic_snacks.svg' alt='다과' width={80} height={80} />
        </div>

        <Txt weight='extrabold' className='pt-5 text-xl'>
          하나은행이 버스를 대절해 드리고
        </Txt>
        <Txt className='text-Modal-font pt-1 pb-5 text-lg'>
          활동 중에는 다과가 함께합니다 !
        </Txt>

        <Button
          color='white'
          borderColor='green'
          textWeight='bold'
          textClassName='text-Hana-Black'
          className='h-[40px] w-[170px] rounded-full'
          onClick={() => router.push('/apply')}
        >
          봉사 신청하기
        </Button>
      </section>
    </main>
  );
}
