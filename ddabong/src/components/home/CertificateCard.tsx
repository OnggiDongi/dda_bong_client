'use client';

import Image from 'next/image';
import Txt from '@/components/atoms/Text';

const ICON_SRC = '/icons/ic_logoStar.svg';
const LOGO_SRC = '/icons/ic_logo.svg';
const HANA_SRC = '/icons/ic_hanabank.svg';

type Props = {
  userName: string;
  date: string;
  totalHours: number;
};

function getCertificateStyle(totalHours: number) {
  switch (totalHours) {
    case 50:
      return { bgColor: 'bg-1Q-Mint', borderColor: 'border-1Q-Mint-Line' };
    case 100:
      return { bgColor: 'bg-1Q-Purple', borderColor: 'border-1Q-Purple-Line' };
    case 150:
      return {
        bgColor: 'bg-Hana-Pink',
        borderColor: 'border-Hana-Pink-border',
      };
    case 200:
      return {
        bgColor: 'bg-Hana-Beige',
        borderColor: 'border-Hana-Beige-Line',
      };
    default:
      return { bgColor: 'bg-1Q-Mint', borderColor: 'border-1Q-Mint-Line' };
  }
}

export default function CertificateCard({ userName, date, totalHours }: Props) {
  const { bgColor, borderColor } = getCertificateStyle(totalHours);

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
        alt='인증서 아이콘'
        width={70}
        height={70}
        className='justify-center'
      />

      <Txt className='pt-0.5 text-[10px]'>{userName}</Txt>
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
