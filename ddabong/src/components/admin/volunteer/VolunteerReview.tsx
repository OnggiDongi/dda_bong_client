'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ReviewRating from '@/components/ReviewRating';
import AiComment from '@/components/atoms/AiComment';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';

type Props = {
  userName: string;
  imageUrl: string;
  totalRate: number | null;
  diligenceLevel: number | null;
  healthStatus: number | null;
  attitude: number | null;
  aiReview: string | null;
  /** /admin/review/[recruitId]/[userId] 등으로 넘길 경로 */
  evaluateHref?: string;
  /** 현재 로그인한 평가자가 이미 평가했는지 */
  hasMyReview?: boolean; // default: false
  /** (선택) 상위에서 라우팅/로깅을 처리하고 싶을 때 */
  onEvaluateClick?: () => void;
};

export default function VolunteerReview({
  userName,
  imageUrl,
  totalRate,
  diligenceLevel,
  healthStatus,
  attitude,
  aiReview,
  evaluateHref,
  hasMyReview = false,
  onEvaluateClick,
}: Props) {
  const router = useRouter();

  const handleEvaluate = () => {
    if (hasMyReview) return; // 이미 평가한 경우 비활성
    if (onEvaluateClick) return onEvaluateClick();
    if (evaluateHref) router.push(evaluateHref);
  };

  const isReviewedByMe = hasMyReview ?? false;
  const btnClasses =
    'h-auto w-auto' +
    (isReviewedByMe ? ' pointer-events-none cursor-default' : '');
  const badgeClasses = 'px-4' + (isReviewedByMe ? ' opacity-70' : '');

  return (
    <div className='mt-1 flex flex-col items-center bg-white'>
      <div className='mt-5 mb-2 flex w-full px-6'>
        <Image
          src={encodeURI(imageUrl)}
          alt='user_profile_url'
          width={48}
          height={48}
          className='h-[48px] w-[48px] flex-shrink-0 rounded-3xl object-cover'
          unoptimized
        />

        <div className='min-w-0 flex-1 pl-3'>
          <div className='flex items-start justify-between gap-2'>
            <Txt className='truncate text-lg'>{userName}</Txt>

            <div className='flex flex-wrap gap-2'>
              <Button
                color='white'
                className={btnClasses}
                textClassName='leading-none flex items-center'
                aria-disabled={isReviewedByMe}
                tabIndex={isReviewedByMe ? -1 : 0}
                onClick={handleEvaluate}
              >
                <Badge
                  text={isReviewedByMe ? '평가완료' : '평가하기'}
                  bgColor={isReviewedByMe ? 'bg-Box-Line' : 'bg-Logo-Pink'}
                  borderColor={isReviewedByMe ? undefined : 'border-Logo-Pink'}
                  textClassName={
                    isReviewedByMe ? 'text-Hana-Black' : 'text-white'
                  }
                  className={badgeClasses}
                />
              </Button>
            </div>
          </div>

          <div className='min-w-0 overflow-hidden'>
            <ReviewRating
              totalRate={totalRate}
              diligenceLevel={diligenceLevel}
              attitude={attitude}
              healthStatus={healthStatus}
            />
            {aiReview ? (
              <AiComment text={aiReview} className='mb-3 w-full break-words' />
            ) : (
              <div className='mb-3 w-full' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
