import { cn } from '@/lib/utils';
import Txt from '@/components/atoms/Text';
import type { fontMap } from '@/components/atoms/Text';

type TxtWeight = keyof typeof fontMap;

type BadgeProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string; // 있으면 border 자동 활성화
  rounded?: string;
  weight?: TxtWeight;
  className?: string;
  textClassName?: string;
};

/**
 * Badge 컴포넌트
 * - bgColor: 배경색
 * - textColor: 글자색
 * - borderColor: 테두리색
 * - rounded: border-radius
 * - weight: Txt의 폰트 굵기
 * - className: 추가적인 커스텀
 * - textClassName: 글자 커스텀
 */
export default function Badge({
  text,
  bgColor = 'bg-Logo-Mint',
  textColor = 'text-white',
  borderColor,
  rounded = 'rounded-3xl',
  weight = 'semibold',
  className,
  textClassName,
}: BadgeProps) {
  const hasBorder = Boolean(borderColor);

  return (
    <span
      className={cn(
        'h-[25px] items-center justify-center px-3',
        bgColor,
        rounded,
        hasBorder && 'border-[0.5px]',
        borderColor,
        className
      )}
    >
      <Txt
        weight={weight}
        className={cn(
          'text-base',
          'whitespace-nowrap',
          textColor,
          textClassName
        )}
      >
        {text}
      </Txt>
    </span>
  );
}
