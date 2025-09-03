import { Review } from '@/app/apply/[id]/page';
import StarRating from '../../StarRating';
import AiComment from '../../atoms/AiComment';
import Txt from '../../atoms/Text';
import ReviewBox from './ReviewBox';

type ApplyReviewProps = {
  reviews: Review[];
  totalAvgScore: number;
};

const DEFAULT_PROFILE_IMAGE =
  'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/7edb4d83-5813-4032-8292-e9f73c086474-(Frame 2087326976.png)';

export default function ApplyReview({
  reviews,
  totalAvgScore,
}: ApplyReviewProps) {
  // AI Comment can be a future feature
  // const aiCommentText = "바다가 참 예뻐서 건강해지는 기분";

  return (
    <section className='flex w-full flex-col px-4'>
      <Txt weight='bold' className='mb-4 text-[20px]'>
        봉사 후기
      </Txt>
      <div className='border-Box-Line mb-3 flex w-full flex-col items-center border-b pb-3'>
        <div className='flex justify-center gap-4'>
          <Txt className='text-[22px]'>{totalAvgScore?.toFixed(1) || '-'}</Txt>
          <StarRating
            value={totalAvgScore || 0}
            size={32}
            className='align-center mb-10'
            label='봉사활동 별점'
            name='volunteer-rating'
            readOnly
          />
        </div>
        {/* <AiComment text={aiCommentText} /> */}
      </div>
      <div>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewBox
              key={review.id}
              userName={review.userName}
              imageUrl={review.profileImage || DEFAULT_PROFILE_IMAGE}
              rate={review.rate}
              content={review.comment}
            />
          ))
        ) : (
          <p className='text-center text-gray-500'>
            아직 작성된 후기가 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}
