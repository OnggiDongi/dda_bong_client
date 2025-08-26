import { cn } from '@/lib/utils';
import BannerCard from '../atoms/BannerCard';

type Props = {
  className?: string;
};

export default function AdminCard({ className }: Props) {
  return (
    <BannerCard
      titleTop='봉사를 모집할'
      titleBottom='기관인가요?'
      iconSrc='/icons/ic_organization.svg'
      href='/adminLogin'
      className={className}
    />
  );
}
