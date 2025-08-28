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
}: Props) {
  return (
    <>
      <div
        className={cn(
          'bg-1Q-Mint-Line inline-flex h-fit w-fit items-center justify-center px-5 py-1.5',
          className,
          rounded
        )}
      >
        <Image
          src={'/icons/ic_gemini.svg'}
          alt={'gemini'}
          width={16}
          height={15}
        />
        <Txt className='text-Logo-Mint pl-1'>{text}</Txt>
      </div>
    </>
  );
}
