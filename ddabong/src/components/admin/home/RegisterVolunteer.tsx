'use client';

import BannerCard from '@/components/atoms/BannerCard';

export default function RegisterVolunteer() {
  return (
    <BannerCard
      titleTop='봉사 등록하기'
      width={350}
      height={129}
      iconSrc='/icons/ic_task.svg'
      iconSize={75}
      href='/register'
      paddingClass='pt-6 pr-4 pb-4 pl-6'
      titleTopClassName='text-[22px]'
      className='bg-1Q-Green border-1Q-Green-Line border'
    />
  );
}
