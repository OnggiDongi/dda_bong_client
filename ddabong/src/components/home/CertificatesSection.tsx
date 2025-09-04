'use client';

import {
  CertificationDTO,
  useMyCertificates,
} from '@/hooks/home/certifications';
import { format } from 'date-fns';
import { useState } from 'react';
import Txt from '@/components/atoms/Text';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';

function fmt(date?: string) {
  return date ? format(new Date(date), 'yyyy.MM.dd') : '';
}

export default function CertificatesSection() {
  const [selected, setSelected] = useState<CertificationDTO | null>(null);

  const { data: certificates = [] } = useMyCertificates();

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
              ? 'hide-scrollbar flex snap-x snap-mandatory [scroll-padding-left:31px] gap-4 overflow-x-auto px-[31px]'
              : 'flex justify-center gap-10'
          }
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={isScrollable ? 'shrink-0 snap-start' : ''}
              onClick={() => setSelected(cert)}
            >
              <CertificateCard
                userName={cert.username ?? ''}
                date={fmt(cert.issuedAt)}
                totalHours={cert.hour ?? 0}
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

      <CertificateModal
        open={!!selected}
        onClose={() => setSelected(null)}
        userName={selected?.username ?? ''}
        date={fmt(selected?.issuedAt)}
        totalHours={selected?.hour ?? 0}
      />
    </section>
  );
}
