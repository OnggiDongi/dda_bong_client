'use client';

import { useUserSummary } from '@/hooks/home/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import OnboardingModal from '../atoms/OnboardingModal';
import ApplyBanner from './ApplyBanner';
import CarouselBanner from './CarouselBanner';
import CertificatesSection from './CertificatesSection';
import Header from './Header';
import ProfileCard from './ProfileCard';

export default function HomePageContents() {
  const { data: user } = useUserSummary();

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
      console.log(v.region, v.interest);
      localStorage.setItem('seen_onboarding', '1');
    } finally {
      setOpen(false);
      router.replace('/home');
    }
  };

  return (
    <main className='flex flex-col items-center gap-4 px-5 pt-5 pb-10'>
      <Header />
      <ProfileCard
        username={user?.name ?? '시별돌'}
        tier={user?.grade ?? 'Silver'}
        totalHours={Number(user?.totalHour ?? 50)}
      />
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
