'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import OnboardingModal from '../atoms/OnboardingModal';
import ApplyBanner from './ApplyBanner';
import CarouselBanner from './CarouselBanner';
import CertificatesSection from './CertificatesSection';
import Header from './Header';
import ProfileCard from './ProfileCard';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const CATEGORY_MAP = {
  생활: 'LIVING',
  교육: 'EDUCATION',
  보건: 'SAFETY',
  문화: 'CULTURE',
  환경: 'ENVIRONMENT',
  행정: 'PUBLIC',
  농어촌: 'GLOBAL',
};

export default function HomePageContents() {
  const { showToast } = useToast();
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
      const token = localStorage.getItem('accessToken');
      await axios.post(
        baseUrl + '/users/onboarding',
        {
          preferredRegion: v.region,
          preferredCategory: [
            CATEGORY_MAP[v.interest as keyof typeof CATEGORY_MAP],
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast('온보딩이 완료되었습니다.');
      localStorage.setItem('seen_onboarding', '1');
    } catch {
      showToast('온보딩 실패. 잠시후 다시 시도해주세요');
    } finally {
      setOpen(false);
      router.replace('/home');
    }
  };

  return (
    <main className='flex flex-col items-center gap-4 px-5 pt-5 pb-10'>
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
