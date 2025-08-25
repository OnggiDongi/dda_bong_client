import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const baseClasses = `
    bg-white
    border border-Box-Line rounded-[10px]
    text-Hana-Black
    placeholder:text-Icon-Detail
    focus:ring-0 focus:outline-none
 `;

type Props = {
  placeholder?: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  className?: string;
  size?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export default function Input({
  placeholder,
  fullWidth = false,
  className,
  ...props
}: Props) {
  return (
    <input
      placeholder={placeholder}
      className={cn(baseClasses, className)}
      {...props}
    />
  );
}
