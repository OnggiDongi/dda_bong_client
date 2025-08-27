import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import Txt, { fontMap } from '@/components/atoms/Text';

const BgColor = {
  green: 'bg-Logo-Mint',
  mint: 'bg-1Q-Mint-Line',
  pink: 'bg-Logo-Pink',
  gray: 'bg-Background',
  white: 'bg-white',
  purple: 'bg-IQ-Purple',
} as const;

const BorderColor = {
  pink: 'border-Logo-Pink',
  mint: 'border-Logo-Mint',
  mint2: 'border-1Q-Mint-Line',
  purple: 'border-IQ-Purple-Line',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof BgColor;
  borderColor?: keyof typeof BorderColor;
  textWeight?: keyof typeof fontMap;
  textClassName?: string;
}

/**
 * Button 컴포넌트
 * - color: 토큰 기반 배경색 (green/mint/pink/gray/white)
 * - borderColor: 토큰 기반 테두리 색상 (pink/mint/mint2/purple)
 * - 글씨 크기/버튼 크기: 호출부에서 className으로 자유롭게 조정
 * - textWeight: 글씨 Bold
 */
export default function Button({
  color = 'green',
  borderColor,
  disabled,
  type = 'button',
  children,
  textWeight = 'semibold',
  textClassName,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex h-[45px] w-[355px] items-center justify-center rounded-xl',
        BgColor[color],
        borderColor ? ['border', BorderColor[borderColor]] : null,
        className
      )}
      {...props}
    >
      {/* TODO:전에 사용한 버튼 TXT로 변경 */}
      <Txt
        weight={textWeight}
        className={cn('text-xl text-white', textClassName)}
      >
        {children}
      </Txt>
    </button>
  );
}
