'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000);
    const t2 = setTimeout(() => {
      onFinish();
    }, 2500); // fade 끝나고 onFinish

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <div
      className={cn(
        'absolute inset-0 z-50 -m-4 opacity-100 transition-opacity duration-1000 ease-in-out',
        { 'opacity-0': fadeOut }
      )}
    >
      <Image
        src='/icons/home_onboarding.svg'
        alt='따봉 온보딩 이미지'
        fill
        priority
        className='object-cover'
      />
    </div>
  );
}
