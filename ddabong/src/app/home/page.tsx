'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import OnboardingModal from '@/components/atoms/OnboardingModal';
import ApplyBanner from '@/components/home/ApplyBanner';
import CarouselBanner from '@/components/home/CarouselBanner';
import CertificatesSection from '@/components/home/CertificatesSection';
import Header from '@/components/home/Header';
import ProfileCard from '@/components/home/ProfileCard';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // /home?onboarding=1 이면 모달 오픈
  const shouldOpenFromQuery = useMemo(
    () => searchParams.get('onboarding') === '1',
    [searchParams]
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldOpenFromQuery) setOpen(true);
  }, [shouldOpenFromQuery]);

  const handleClose = () => {
    localStorage.setItem('seen_onboarding', '1');
    setOpen(false);
    router.replace('/home');
  };

  const handleSubmit = async (v: { region: string; interest: string }) => {
    try {
      localStorage.setItem('seen_onboarding', '1');
    } finally {
      setOpen(false);
      router.replace('/home');
    }
  };

  return (
    <main className='flex flex-col items-center gap-4 px-5 pt-5'>
      <Header />
      <ProfileCard username={'별돌이군'} tier={'Silver'} totalHours={72} />
      <ApplyBanner />
      <CarouselBanner />
      <CertificatesSection />

      {/* 온보딩 모달 */}
      <OnboardingModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
