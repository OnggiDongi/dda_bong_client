'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';

type Mode = 'apply' | 'history';

type Props = {
  mode?: Mode;
  id: number;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  recruitNum?: number;
  applicantsNum?: number;
  rating?: number;
  className?: string;
  evaluateHref?: string;
  allReviewsHref?: string;
};

export default function VolunList({
  mode = 'apply',
  id,
  title,
  date,
  category,
  imageUrl,
  recruitNum,
  applicantsNum,
  rating,
  className,
  evaluateHref,
  allReviewsHref,
}: Props) {
  const router = useRouter();

  const star = (
    <div className='flex items-center gap-1'>
      <Image src='/icons/ic_ddabong.svg' alt='평점' width={16} height={16} />
      <Txt className='text-base'>
        {rating !== undefined ? rating.toFixed(1) : '-'}
      </Txt>
    </div>
  );

  const handleEvaluate = () => {
    router.push(evaluateHref ?? `/admin/review/volunteer/${id}`);
  };

  const handleAllReviews = () => {
    router.push(allReviewsHref ?? `/apply/${id}`);
  };

  return (
    <div className={cn('bg-white px-4 py-5', className)}>
      <div className='flex items-center gap-3'>
        <Image
          src={imageUrl}
          alt={title}
          width={76}
          height={76}
          className='h-[76px] w-[76px] shrink-0 rounded-xl object-cover'
        />

        <div className='flex flex-col'>
          <div>
            <Badge text={category} />
          </div>
          <Txt className='truncate text-lg'>{title}</Txt>
          <Txt className='text-Icon-Detail text-base'>{date}</Txt>
        </div>

        <div
          className={cn(
            'ml-auto flex shrink-0 flex-col items-end gap-1 pb-4',
            mode === 'apply' ? 'pb-4' : 'pb-12'
          )}
        >
          {mode === 'apply' ? (
            <>
              <Txt className='text-base'>
                지원 인원 {applicantsNum}/{recruitNum}
              </Txt>
              {star}
            </>
          ) : (
            star
          )}
        </div>
      </div>
      {mode === 'history' && (
        <div className='flex justify-center gap-3 pt-3 pl-18'>
          <Button
            className='h-[25px] w-[120px]'
            color='pink'
            onClick={handleEvaluate}
            textClassName='text-base'
          >
            봉사자 평가
          </Button>
          <Button
            className='h-[25px] w-[120px]'
            color='pink'
            onClick={handleAllReviews}
            textClassName='text-base'
          >
            봉사 전체 리뷰
          </Button>
        </div>
      )}
    </div>
  );
}
