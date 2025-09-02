import Image from 'next/image';
import { cn } from '@/lib/utils';
import Txt from '@/components/atoms/Text';
import type { fontMap } from '@/components/atoms/Text';

type TxtWeight = keyof typeof fontMap;

type Props = {
  text: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string; // 있으면 border 자동 활성화
  rounded?: string;
  weight?: TxtWeight;
  className?: string;
  textClassName?: string;
};

export default function AiComment({
  text,
  rounded = 'rounded-full',
  className,
  textClassName,
}: Props) {
  return (
    <div
      className={cn(
        // 내용 길이에 맞게 (chip) + 부모 콘텐츠 영역을 넘지 않도록
        'bg-1Q-Mint-Line inline-flex w-auto max-w-full items-center justify-center',
        'min-w-0 gap-1.5 px-5 py-1.5', // 줄바꿈 허용(min-w-0)
        rounded,
        className
      )}
    >
      <Image
        src='/icons/ic_gemini.svg'
        alt='gemini'
        width={16}
        height={15}
        className='shrink-0'
      />
      <Txt
        className={cn(
          'text-Logo-Mint pl-1 break-words whitespace-normal',
          textClassName
        )}
      >
        {text}
      </Txt>
    </div>
  );
}
