'use client';

import Txt from '@/components/atoms/Text';
import CertificateCard from './CertificateCard';

const certificates: {
  title: string;
  date: string;
  totalHours: string;
  bgColor: string;
  borderColor?: string;
}[] = [
  // 테스트 데이터
  {
    title: '시별돌',
    date: '2026.09.05',
    totalHours: '50',
    bgColor: 'bg-1Q-Mint',
    borderColor: 'border-1Q-Mint-Line',
  },
  {
    title: '시별돌',
    date: '2026.09.08',
    totalHours: '100',
    bgColor: 'bg-1Q-Purple',
    borderColor: 'border-1Q-Purple-Line',
  },
];

export default function CertificatesSection() {
  return (
    <section className='border-Background h-[280px] w-[350px] rounded-[20px] border bg-white'>
      <Txt
        weight='heavy'
        className='block px-[31px] pt-[25px] pb-[18px] text-left text-[22px]'
      >
        나의 인증서
      </Txt>

      {certificates.length > 0 ? (
        <div className='flex justify-center gap-12'>
          {certificates.map((cert, idx) => (
            <CertificateCard key={idx} {...cert} />
          ))}
        </div>
      ) : (
        <div className='flex h-40 items-center justify-center text-center'>
          <Txt weight='semibold' className='text-Hana-Black text-xl'>
            봉사 시간을 채워 <br /> 인증서를 받아보세요!
          </Txt>
        </div>
      )}
    </section>
  );
}
