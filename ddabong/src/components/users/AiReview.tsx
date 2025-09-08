'use client';

import AiComment from '@/components/atoms/AiComment';

type Props = {
  text: string;
};

export default function AiReview({ text }: Props) {
  return (
    <div className='flex items-center justify-center bg-white px-8 pb-8'>
      <AiComment text={text} />
    </div>
  );
}
