'use client';

import { usePendingApplicantsCount } from '@/hooks/queries/usePendingApplicantsCount';
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
  rating,
  className,
  evaluateHref,
  allReviewsHref,
  detailHref,
  applicantsHref,
}: Props) {
  const router = useRouter();
  const pendingApplicantsNum = usePendingApplicantsCount(id);

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
              <Txt className='text-base'>
                승인 대기: {pendingApplicantsNum}명
              </Txt>
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
