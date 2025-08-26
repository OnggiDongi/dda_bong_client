import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Txt from '@/components/atoms/Text';

type BannerCardProps = {
  titleTop: string;
  titleBottom: string;

  iconSrc: string;
  iconAlt?: string;

  width?: number; // 기본 350
  height?: number; // 기본 180
  iconSize?: number; // 기본 130

  bgClass?: string; // ex) 'bg-1Q-Purple'
  borderClass?: string; // ex) 'border-1Q-Purple-Line'
  roundedClass?: string; // ex) 'rounded-[20px]'
  paddingClass?: string; // ex) 'pt-[25px] pr-2 pb-2 pl-[25px]'

  href?: string; // 링크 주소
  className?: string;
};

export default function BannerCard({
  titleTop,
  titleBottom,
  iconSrc,
  iconAlt = 'banner icon',
  width = 350,
  height = 180,
  iconSize = 130,
  bgClass = 'bg-1Q-Purple',
  borderClass = 'border-1Q-Purple-Line',
  roundedClass = 'rounded-[20px]',
  paddingClass = 'pt-[25px] pr-2 pb-2 pl-[25px]',
  href,
  className,
}: BannerCardProps) {
  const content = (
    <div
      className={cn(
        bgClass,
        borderClass,
        'flex flex-col justify-between',
        roundedClass,
        paddingClass,
        className
      )}
      style={{ width, height }}
    >
      <div className='flex justify-between'>
        <div className='flex flex-col items-start'>
          <Txt
            weight='semibold'
            className='text-Hana-Black text-[26px] leading-[1.2]'
          >
            {titleTop}
          </Txt>
          <Txt
            weight='extrabold'
            className='text-Hana-Black text-[30px] leading-[1.2]'
          >
            {titleBottom}
          </Txt>
        </div>

        <Image
          src={iconSrc}
          alt={iconAlt}
          width={iconSize}
          height={iconSize}
          className='mt-[18px] self-end object-contain'
          priority
        />
      </div>
    </div>
  );

  // href 있으면 <Link>로 감싸고, 없으면 그냥 div 반환
  return href ? <Link href={href}>{content}</Link> : content;
}
