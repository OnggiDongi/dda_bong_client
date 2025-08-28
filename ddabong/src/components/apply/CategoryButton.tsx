'use client';

import { cn } from '@/lib/utils';

type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function CategoryButton({
  label,
  active,
  onClick,
  className,
}: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'h-10 w-20 rounded-lg border-[0.5px] text-lg font-semibold transition-colors',
        active
          ? 'bg-Logo-Mint border-Logo-Mint text-white'
          : 'border-Logo-Mint text-Logo-Mint bg-white',
        className
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
