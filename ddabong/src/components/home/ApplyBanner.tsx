'use client';

import BannerCard from '../atoms/BannerCard';

export default function ApplyButton() {
  return (
    <BannerCard
      titleTop='오늘 뭐하지?'
      titleBottom='봉사 신청하러 가요!'
      iconSrc='/icons/ic_menu.svg'
      iconSize={85}
      href='/senior/apply'
      paddingClass='pt-6 pr-4 pb-4 pl-6'
      iconClassName='pt-8'
      titleTopClassName='text-2xl'
      titleBottomClassName='text-[26px]'
    />
  );
}
