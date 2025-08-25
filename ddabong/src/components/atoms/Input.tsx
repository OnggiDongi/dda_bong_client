import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  placeholder?: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  className?: string;
  size?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

const Input = forwardRef(function Input(
  {
    placeholder,
    width = 300,
    height = 50,
    fullWidth = false,
    className,
    ...props
  }: Props,
  ref: Ref<HTMLInputElement>
) {
  const baseClasses = `
    bg-white border border-Box-Line rounded-[10px]
    text-Hana-Black
    placeholder:text-Icon-Detail
    focus:focus:ring-0 focus:outline-none
  `;

  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className={cn(baseClasses, className)}
      {...props}
    />
  );
});

export default Input;
