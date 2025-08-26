import BannerCard from '@/components/atoms/BannerCard';

export default function ManageVolunteer() {
  return (
    <BannerCard
      titleTop='봉사 지원자'
      titleBottom='관리하기'
      width={170}
      height={160}
      iconSrc='/icons/ic_menu.svg'
      iconSize={75}
      href='/manage'
      paddingClass='pt-4 pb-4 pl-5 pr-4 relative'
      iconClassName='absolute bottom-3 right-1.5'
      titleTopClassName='text-xl whitespace-nowrap'
      titleBottomClassName='text-xl'
      titleTopWeight='semibold'
      titleBottomWeight='semibold'
      titleGapClassName='pt-1'
      className='bg-Hana-Beige border-Hana-Beige-Line border'
    />
  );
}
