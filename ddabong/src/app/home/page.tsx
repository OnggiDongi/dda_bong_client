'use client';

import { useUserSummary } from '@/hooks/home/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OnboardingModal from '@/components/atoms/OnboardingModal';
import ApplyBanner from '@/components/home/ApplyBanner';
import CarouselBanner from '@/components/home/CarouselBanner';
import CertificatesSection from '@/components/home/CertificatesSection';
import Header from '@/components/home/Header';
import ProfileCard from '@/components/home/ProfileCard';

export default function HomePageContents() {
  const { data: user } = useUserSummary();

  const username = user?.name ?? '시별돌';
  const tier = user?.grade ?? 'Silver';
  const totalHours = Number(user?.totalHour ?? 50);

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
      <OnboardingModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
