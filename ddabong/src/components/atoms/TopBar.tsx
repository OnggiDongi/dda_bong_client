'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Txt from '@/components/atoms/Text';

type Props = {
  title?: string;
  onBack?: () => void; // 외부 핸들러가 있으면 우선 사용
};

export default function TopBar({ title = '봉사 등록하기', onBack }: Props) {
  const router = useRouter();
  const handleBack = () => (onBack ? onBack() : router.back());

  return (
    <header className='relative flex items-center justify-center bg-white'>
      <button
        type='button'
        onClick={handleBack}
        className='absolute start-0 ml-[19px] pt-[25px] pb-[22px]'
      >
        <Image
          src='/icons/ic_arrow_back.svg'
          alt='뒤로가기'
          width={10}
          height={20}
          priority
        />
      </button>
      <Txt weight='semibold' className='pt-[23px] pb-[19px] text-xl'>
        {title}
      </Txt>
    </header>
  );
}
