import BannerCard from '../atoms/BannerCard';

export default function AdminCard() {
  return (
    <BannerCard
      titleTop='봉사를 모집할'
      titleBottom='기관인가요?'
      iconSrc='/icons/ic_organization.svg'
      href='/signIn/admin'
    />
  );
}
