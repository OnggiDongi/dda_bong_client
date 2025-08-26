'use client';

import BannerCard from '@/components/atoms/BannerCard';

export default function RecruitVolunteer() {
  return (
    <BannerCard
      titleTop='봉사 지원자'
      titleBottom='모집하기'
      width={170}
      height={160}
      iconSrc='/icons/ic_book.svg'
      iconSize={90}
      href='/recruit'
      paddingClass='pt-4 pb-4 pl-5 pr-4 relative'
      iconClassName='absolute bottom-0.5 right-1'
      titleTopClassName='text-xl whitespace-nowrap'
      titleBottomClassName='text-xl'
      titleTopWeight='semibold'
      titleBottomWeight='semibold'
      titleGapClassName='pt-1'
    />
  );
}
