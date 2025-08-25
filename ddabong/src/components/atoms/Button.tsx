import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

const BgColor = {
  green: 'bg-Logo-Mint',
  mint: 'bg-1Q-Mint-Line',
  pink: 'bg-Logo-Pink',
  gray: 'bg-Background',
  white: 'bg-white',
} as const;

const BorderColor = {
  pink: 'border-Logo-Pink',
  mint: 'border-Logo-Mint',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof BgColor;
  className?: string;
  borderColor?: keyof typeof BorderColor;
}

/**
 * Button 컴포넌트
 * - color: 토큰 기반 배경색 (green/mint/pink/gray/white)
 * - borderColor: 토큰 기반 테두리 색상 (pink/mint)
 * - 글씨 크기/버튼 크기: 호출부에서 className으로 자유롭게 조정
 */

export default function Button({
  color = 'green',
  className,
  borderColor,
  disabled,
  type = 'button',
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex h-[45px] w-[355px] items-center justify-center rounded-xl font-[AppleSDGothicNeoSB] text-xl text-white transition-colors',
        BgColor[color],
        borderColor ? ['border', BorderColor[borderColor]] : null,
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
