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
  rating?: number;
  className?: string;
  evaluateHref?: string;
  allReviewsHref?: string;
  detailHref?: string;
  applicantsHref?: string;
  applicantNum?: number;
};

export default function VolunList({
  mode = 'apply',
  id,
  title,
  date,
  category,
  imageUrl,
  rating,
  className,
  evaluateHref,
  applicantsHref,
  applicantNum,
}: Props) {
  const router = useRouter();

  const defaults = {
    evaluate: `/admin/review/${id}`,
    allReviews: `/apply/${id}`,
    detail: `/admin/recruit/${id}`,
    applicants: `/admin/volunteer/${id}`,
  };

  const handleNavigate = () => router.push(`/admin/recruit/${id}`);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (mode === 'apply') {
      router.push(applicantsHref ?? defaults.applicants);
    } else {
      router.push(evaluateHref ?? defaults.evaluate);
    }
  };

  return (
    <div
      className={cn(
        'cursor-pointer overflow-hidden bg-white px-4 py-5',
        className
      )}
      onClick={handleNavigate}
    >
      <div className='flex items-start gap-3'>
        <Image
          src={imageUrl}
          alt={title}
          width={76}
          height={76}
          className='h-[76px] w-[76px] shrink-0 rounded-xl object-cover'
        />
        <div className='flex min-w-0 flex-1 flex-col'>
          <div className='mb-0.5'>
            <Badge text={category} />
          </div>
          <Txt className='truncate text-lg'>{title}</Txt>
          <Txt className='text-Icon-Detail text-base'>{date}</Txt>
        </div>

        <div className='ml-3 flex w-[105px] flex-none flex-col items-end gap-1 pb-4'>
          {mode === 'apply' ? (
            <>
              <Txt className='text-base'>승인 대기: {applicantNum}명</Txt>
              <div className='flex items-center gap-1'>
                <Image
                  src='/icons/ic_ddabong.svg'
                  alt='평점'
                  width={16}
                  height={16}
                />
                <Txt className='text-base'>
                  {rating !== undefined ? rating.toFixed(1) : '-'}
                </Txt>
              </div>
            </>
          ) : (
            <div className='flex items-center gap-1'>
              <Image
                src='/icons/ic_ddabong.svg'
                alt='평점'
                width={16}
                height={16}
              />
              <Txt className='text-base'>
                {rating !== undefined ? rating.toFixed(1) : '-'}
              </Txt>
            </div>
          )}
        </div>
      </div>

      <div className='mt-3 flex justify-end gap-7'>
        <Button
          className='h-[25px] w-[120px]'
          color='pink'
          onClick={handleButtonClick}
          textClassName='text-base'
        >
          {mode === 'apply' ? '지원자 보기' : '봉사자 평가'}
        </Button>
      </div>
    </div>
  );
}
