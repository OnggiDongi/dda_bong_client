import BannerCard from '../atoms/BannerCard';

export default function SeniorCard() {
  return (
    <BannerCard
      titleTop='봉사를 찾고있는'
      titleBottom='개인인가요?'
      iconSrc='/icons/ic_senior.svg'
      href='/signIn/senior'
      bgClass='bg-Hana-Beige'
      borderClass='border-Hana-Beige-Line'
    />
  );
}
