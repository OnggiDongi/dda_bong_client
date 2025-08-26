import BannerCard from '../atoms/BannerCard';

type Props = { className?: string };

export default function SeniorCard({ className }: Props) {
  return (
    <BannerCard
      titleTop="봉사를 찾고있는"
      titleBottom="개인인가요?"
      iconSrc="/icons/ic_senior.svg"
      href="/seniorLogin"
      bgClass="bg-Hana-Beige"
      borderClass="border-Hana-Beige-Line"
      className={className}
    />
  );
}