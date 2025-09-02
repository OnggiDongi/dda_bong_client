'use client';

import { useUserSummary } from '@/hooks/home/user';
// import { useEffect, useState } from 'react';
// import OnboardingModal from '@/components/atoms/OnboardingModal';
import ApplyBanner from '@/components/home/ApplyBanner';
import CarouselBanner from '@/components/home/CarouselBanner';
import CertificatesSection from '@/components/home/CertificatesSection';
import Header from '@/components/home/Header';
import ProfileCard from '@/components/home/ProfileCard';

export default function HomePage() {
  const { data: user } = useUserSummary();
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const firstLogin = localStorage.getItem('firstLogin');
  //   if (firstLogin === 'true') {
  //     setOpen(true);
  //   }
  // }, []);

  // const handleClose = () => {
  //   // 한 번만 뜨게 localStorage 업데이트
  //   localStorage.setItem('firstLogin', 'false');
  //   setOpen(false);
  // };

  // const handleSubmit = async (v: { region: string; interest: string }) => {
  //   try {
  //     // 온보딩 정보 저장 API 호출 자리 (필요하면 구현)
  //     localStorage.setItem('firstLogin', 'false');
  //   } finally {
  //     setOpen(false);
  //   }
  // };

  return (
    <main className='flex flex-col items-center gap-4 px-5 pt-5 pb-10'>
      <Header />
      <ProfileCard
        username={user?.name ?? ''}
        tier={user?.grade ?? ''}
        totalHours={Number(user?.totalHour ?? 0)}
      />
      <ApplyBanner />
      <CarouselBanner />
      <CertificatesSection />
      {/* 온보딩 모달 */}
      {/* <OnboardingModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      /> */}
    </main>
  );
}
