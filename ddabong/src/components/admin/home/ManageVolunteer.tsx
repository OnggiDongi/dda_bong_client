'use client';

import BannerCard from '@/components/atoms/BannerCard';

export default function MangageVolunteer() {
  return (
    <BannerCard
      titleTop='봉사 지원자 관리하기'
      width={170}
      height={160}
      iconSrc='/icons/ic_book.svg'
      iconSize={75}
      href='/manage'
      paddingClass='pt-6 pr-4 pb-4 pl-6'
      titleTopClassName='text-[22px]'
      className='bg-Hana-Beige border-Hana-Beige-Line border'
    />
  );
}
