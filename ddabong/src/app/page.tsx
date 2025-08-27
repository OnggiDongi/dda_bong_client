'use client';

import { useState } from 'react';
import SplashScreen from '@/components/HomeOnboarding';
import OnboardingPage from './onboarding/page';

export default function Page() {
  const [finished, setFinished] = useState(false);

  return (
    <div className='bg-Page-Background relative h-screen w-full overflow-hidden'>
      {/* 스플래시 */}
      {!finished && <SplashScreen onFinish={() => setFinished(true)} />}

      {/* 실제 온보딩 화면 - 기관/시니어 선택 페이지 */}
      {finished && <OnboardingPage />}
    </div>
  );
}
