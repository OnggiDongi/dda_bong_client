'use client';

import Txt from '@/components/atoms/Text';
import CertificateCard from './CertificateCard';

const certificates: {
  username: string;
  date: string;
  totalHours: number;
}[] = [
  { username: '시별돌', date: '2026.09.05', totalHours: 50 },
  { username: '시별돌', date: '2026.09.08', totalHours: 100 },
  { username: '시별돌', date: '2026.09.10', totalHours: 150 },
  // { username: '시별돌', date: '2026.09.15', totalHours: 200 },
];

export default function CertificatesSection() {
  const isScrollable = certificates.length > 2;
  return (
    <section className='border-Background h-[280px] w-[350px] rounded-[20px] border bg-white'>
      <Txt
        weight='heavy'
        className='block px-[31px] pt-[25px] pb-[18px] text-left text-[22px]'
      >
        나의 인증서
      </Txt>

      {certificates.length > 0 ? (
        <div
          className={
            isScrollable
              ? 'flex snap-x snap-mandatory gap-4 overflow-x-auto px-[31px]'
              : 'flex justify-center gap-10'
          }
        >
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className={isScrollable ? 'shrink-0 snap-start' : ''}
            >
              <CertificateCard
                userName={cert.username}
                date={cert.date}
                totalHours={cert.totalHours}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex h-40 items-center justify-center text-center'>
          <Txt className='text-xl'>
            봉사 시간을 채워 <br /> 인증서를 받아보세요!
          </Txt>
        </div>
      )}
    </section>
  );
}
