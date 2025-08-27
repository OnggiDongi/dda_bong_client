'use client';

import Image from 'next/image';
import Txt from '@/components/atoms/Text';

const ICON_SRC = '/icons/ic_logoStar.svg';
const LOGO_SRC = '/icons/ic_logo.svg';
const HANA_SRC = '/icons/ic_hanabank.svg';

type Props = {
  title: string;
  date: string;
  totalHours: string;
  bgColor: string; // "bg-1Q-Mint" | "bg-1Q-Purple"
  borderColor?: string; // "border-1Q-Mint-Line" | "border-1Q-Purple-Line"
};

export default function CertificateCard({
  title,
  date,
  totalHours,
  bgColor,
  borderColor,
}: Props) {
  return (
    <div
      className={`${bgColor} ${borderColor} relative flex h-[180px] w-[120px] flex-col items-center rounded-2xl pt-6 text-center`}
    >
      <div className='justify-end'>
        <Image
          src={HANA_SRC}
          alt='하나은행 로고'
          width={15}
          height={15}
          className='absolute top-3 right-3'
        />
      </div>

      <Image
        src={ICON_SRC}
        alt={title}
        width={70}
        height={70}
        className='justify-center'
      />

      <Txt weight='semibold' className='text-Hana-Black pt-0.5 text-[10px]'>
        {title}
      </Txt>
      <Txt className='text-Icon-Detail text-[7px]'>{date}</Txt>
      <Txt weight='bold' className='text-Logo-Mint pt-1 text-[11px]'>
        봉사 {totalHours}시간 달성!
      </Txt>
      <div className='flex items-center justify-center pt-1'>
        <Image src={LOGO_SRC} alt='따봉 로고' width={15} height={15} />
        <Txt className='text-Logo-Pink text-[6px]'>이 함께 축하해요</Txt>
      </div>
    </div>
  );
}
