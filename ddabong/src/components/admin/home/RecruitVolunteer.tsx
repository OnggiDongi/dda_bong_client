'use client';

import BannerCard from '@/components/atoms/BannerCard';

export default function RecruitVolunteer() {
  return (
    <BannerCard
      titleTop='봉사 지원자 모집하기'
      width={170}
      height={160}
      iconSrc='/icons/ic_menu.svg'
      iconSize={75}
      href='/recruit'
      paddingClass='pt-6 pr-4 pb-4 pl-6'
      titleTopClassName='text-[22px]'
      // iconClassName='pt-10'
    />
  );
}
