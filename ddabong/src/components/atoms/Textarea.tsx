import { TextareaHTMLAttributes } from 'react';
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
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ placeholder, className, ...props }: Props) {
  return (
    <textarea
      placeholder={placeholder}
      className={cn(baseClasses, className)}
      {...props}
    />
  );
}
