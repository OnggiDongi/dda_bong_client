import Image from 'next/image';
import StarRating from '@/components/StarRating';
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
          <Txt weight='extrabold' className='px-3.5'>
            {totalRate.toFixed(1)}
          </Txt>
          <StarRating value={4} readOnly={true} size={20} />
        </div>

        {/* 성실도 / 친화력 / 건강 상태 */}
        <div className='flex items-center gap-3'>
          {/* 성실도 */}
          <div className='flex items-center gap-1'>
            <Txt weight='medium' className='text-Modal-font'>
              성실도
            </Txt>
            <Image
              src='/icons/ic_star_filled.svg'
              alt='별'
              width={18}
              height={18}
            />
            <Txt className='text-Modal-font pl-1'>
              {diligenceLevel.toFixed(1)}
            </Txt>
          </div>

          {/* 친화력 */}
          <div className='flex items-center gap-1'>
            <Txt weight='medium' className='text-Modal-font'>
              친화력
            </Txt>
            <Image
              src='/icons/ic_star_filled.svg'
              alt='별'
              width={18}
              height={18}
            />
            <Txt className='text-Modal-font pl-1'>{attitude.toFixed(1)}</Txt>
          </div>

          {/* 건강 상태 */}
          <div className='flex items-center gap-1'>
            <Txt weight='medium' className='text-Modal-font'>
              건강 상태
            </Txt>
            <Image
              src='/icons/ic_star_filled.svg'
              alt='별'
              width={18}
              height={18}
            />
            <Txt className='text-Modal-font pl-1'>
              {healthStatus.toFixed(1)}
            </Txt>
          </div>
        </div>
      </div>
    </>
  );
}
