'use client';

import { useUserSummary } from '@/hooks/home/user';
import Image from 'next/image';
import TopBar from '@/components/atoms/TopBar';
import VipBenefitCard from '@/components/home/vip/VipBenefitCard';
import VipBenefitSection from '@/components/home/vip/VipBenefitSection';
import VipLevelCard from '@/components/home/vip/VipLevelCard';

export default function VipPage() {
  const { data: user, isLoading, error } = useUserSummary();

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Image
          src='/video/loading.gif'
          alt='로딩 중'
          width={130}
          height={130}
          unoptimized
        />
      </div>
    );
  }

  if (error) {
    return (
      <p className='text-Logo-Pink mt-20 text-center'>오류가 발생했습니다.</p>
    );
  }

  const username = user?.name ?? '시별돌';
  const totalHours = Number(user?.totalHour ?? 50);

  return (
    <div className='bg-page-gradient flex w-full flex-col'>
      <TopBar title='나의 등급' bgColor='bg-page-background' />
      <div className='flex-1 px-[26px] pt-[23px]'>
        <VipLevelCard userName={username} totalHours={totalHours} />
        <div className='border-Box-Line border-b pb-[269px]'>
          <VipBenefitCard
            benefitText='봉사 50시간마다 새로운 인증서를 발급해 드립니다 !'
            imageSrc='/icons/ic_flyingStar.svg'
          />
        </div>
        <VipBenefitSection />
      </div>
    </div>
  );
}
