import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  size?: number;
  weight?: keyof typeof fontMap;
  align?: keyof typeof alignMap;
} & HTMLAttributes<HTMLSpanElement>;

export const alignMap = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

export const fontMap = {
  semibold: 'font-[AppleSDGothicNeoSB]',
  medium: 'font-[AppleSDGothicNeoM]',
  bold: 'font-[AppleSDGothicNeoB]',
  extrabold: 'font-[AppleSDGothicNeoEB]',
  heavy: 'font-[AppleSDGothicNeoH]',
} as const;

export default function Txt({
  children,
  className,
  size = 16,
  weight = 'semibold',
  align = 'center',
  ...props
}: PropsWithChildren<Props>) {
  return (
    <span
      className={cn(
        'text-[var(--Hana-Black)]',
        fontMap[weight],
        alignMap[align],
        className
      )}
      style={{ fontSize: `${size}px` }}
      {...props}
    >
      {children}
    </span>
  );
}
