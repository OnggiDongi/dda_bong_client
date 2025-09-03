'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import OnboardingModal from '@/components/atoms/OnboardingModal';
import ApplyBanner from '@/components/home/ApplyBanner';
import CarouselBanner from '@/components/home/CarouselBanner';
import CertificatesSection from '@/components/home/CertificatesSection';
import Header from '@/components/home/Header';
import HomePageContents from '@/components/home/HomePageContents';
import ProfileCard from '@/components/home/ProfileCard';

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContents />
    </Suspense>
  );
}
