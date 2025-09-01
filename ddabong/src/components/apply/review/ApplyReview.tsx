import { Review } from '@/app/apply/[id]/page';
import StarRating from '../../StarRating';
import AiComment from '../../atoms/AiComment';
import Txt from '../../atoms/Text';
import ReviewBox from './ReviewBox';

type ApplyReviewProps = {
  reviews: Review[];
};

export default function ApplyReview({ reviews }: ApplyReviewProps) {
  const reviewAvg = 4.3;

  return (
    <section className='flex w-full flex-col px-4'>
      <Txt weight='bold' className='mb-4 text-[20px]'>
        봉사후기
      </Txt>
      <div className='mb-3 flex w-full flex-col items-center pb-3'>
        <div className='flex justify-center gap-4'>
          <Txt className='text-[22px]'>{reviewAvg}</Txt>
          <StarRating
            value={reviewAvg}
            size={32}
            className='align-center mb-10'
            label='봉사활동 별점'
            name='volunteer-rating'
            required
          />
        </div>
        <AiComment text='바다가 참 예뻐서 건강해지는 기분' />
      </div>
      <div>
        {reviews.map((review) => (
          <ReviewBox
            key={review.id}
            userName={review.userName}
            imageUrl={review.imageUrl}
            rate={review.rate}
            content={review.content}
          />
        ))}
      </div>
    </section>
  );
}
