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

  // history 모드에서 사용 (기존)
  evaluateHref?: string;
  allReviewsHref?: string;

  // apply 모드에서 사용할 새 링크
  detailHref?: string; // 봉사 상세 보기
  applicantsHref?: string; // 지원자 보기
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
  detailHref,
  applicantsHref,
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

  // 기본 라우트 (주입 안되면 아래로 이동)
  const defaults = {
    evaluate: `/admin/review/${id}`, // /${userid} 덧붙여야됨 .. 예: 관리자 평가 작성/수정
    allReviews: `/apply/${id}`, // 예: 봉사 전체 리뷰 보기
    detail: `/admin/recruit/${id}`, // 예: 봉사 상세 페이지
    applicants: `/admin/volunteer/${id}`, // 예: 지원자 목록
  };

  // 모드에 따라 버튼 라벨/링크 결정
  const primaryAction =
    mode === 'history'
      ? { label: '봉사자 평가', href: evaluateHref ?? defaults.evaluate }
      : { label: '봉사 상세 보기', href: detailHref ?? defaults.detail };

  const secondaryAction =
    mode === 'history'
      ? { label: '봉사 전체 리뷰', href: allReviewsHref ?? defaults.allReviews }
      : { label: '지원자 보기', href: applicantsHref ?? defaults.applicants };

  const handlePrimary = () => router.push(primaryAction.href);
  const handleSecondary = () => router.push(secondaryAction.href);

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
            'ml-auto flex shrink-0 flex-col items-end gap-1',
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

      <div className='flex justify-end gap-7 pt-3'>
        <Button
          className='h-[25px] w-[120px]'
          color='pink'
          onClick={handlePrimary}
          textClassName='text-base'
        >
          {primaryAction.label}
        </Button>
        <Button
          className='h-[25px] w-[120px]'
          color='pink'
          onClick={handleSecondary}
          textClassName='text-base'
        >
          {secondaryAction.label}
        </Button>
      </div>
    </div>
  );
}
