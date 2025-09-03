'use client';

import { useUserSummary } from '@/hooks/home/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OnboardingModal from '../atoms/OnboardingModal';
import ApplyBanner from './ApplyBanner';
import CarouselBanner from './CarouselBanner';
import CertificatesSection from './CertificatesSection';
import Header from './Header';
import ProfileCard from './ProfileCard';

export default function HomePageContents() {
  const { data: user } = useUserSummary();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const username = mounted ? (user?.name ?? '시별돌') : '';
  const tier = mounted ? (user?.grade ?? 'Silver') : '';
  const totalHours = mounted ? Number(user?.totalHour ?? 50) : 0;

  const router = useRouter();
  const [open, setOpen] = useState(false);

  // 첫 렌더에 localStorage.firstLogin === 'true'이면 모달 오픈
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin === 'true') setOpen(true);
  }, []);

  const handleClose = () => {
    // 모달 닫았으면 한 번만 뜨도록 false로 변경
    localStorage.setItem('firstLogin', 'false');
    setOpen(false);
    router.replace('/home');
  };

  const handleSubmit = async (v: { region: string; interest: string }) => {
    try {
      console.log(v.region, v.interest);
      localStorage.setItem('firstLogin', 'false');
    } finally {
      setOpen(false);
      router.replace('/home');
    }
  };

  return (
    <main className='flex flex-col items-center gap-4 px-5 pt-5 pb-10'>
      <Header />
      <ProfileCard username={username} tier={tier} totalHours={totalHours} />
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
