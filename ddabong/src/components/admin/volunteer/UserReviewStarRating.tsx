import Image from 'next/image';
import Txt from '@/components/atoms/Text';

type Props = {
  totalRate: number;
  diligenceLevel: number;
  healthStatus: number;
  attitude: number;
};

export default function UserReviewStarRating({
  totalRate,
  diligenceLevel,
  healthStatus,
  attitude,
}: Props) {
  return (
    <>
      <div className='mt-1 flex flex-col items-start bg-white px-8 py-8'>
        {/* 평균 별점 */}
        <div className='flex items-center gap-2 pb-2'>
          <Txt weight='medium' className='text-Modal-font'>
            평균 별점
          </Txt>
          <Txt weight='extrabold'>{totalRate.toFixed(1)}</Txt>
        </div>

        {/* 성실도 / 친화력 / 건강 상태 */}
        <div className='flex items-center gap-6'>
          {/* 성실도 */}
          <div className='flex items-center gap-1'>
            <Txt weight='medium' className='text-Modal-font text-sm'>
              성실도
            </Txt>
            <Image
              src='/icons/ic_star_filled.svg'
              alt='별'
              width={18}
              height={18}
            />
            <Txt weight='extrabold'>{diligenceLevel.toFixed(1)}</Txt>
          </div>

          {/* 친화력 */}
          <div className='flex items-center gap-1'>
            <Txt weight='medium' className='text-Modal-font text-sm'>
              친화력
            </Txt>
            <Image
              src='/icons/ic_star_filled.svg'
              alt='별'
              width={18}
              height={18}
            />
            <Txt weight='extrabold'>{attitude.toFixed(1)}</Txt>
          </div>

          {/* 건강 상태 */}
          <div className='flex items-center gap-1'>
            <Txt weight='medium' className='text-Modal-font text-sm'>
              건강 상태
            </Txt>
            <Image
              src='/icons/ic_star_filled.svg'
              alt='별'
              width={18}
              height={18}
            />
            <Txt weight='extrabold'>{healthStatus.toFixed(1)}</Txt>
          </div>
        </div>
      </div>
    </>
  );
}
