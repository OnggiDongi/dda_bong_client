import { Review } from '@/app/apply/[id]/page';
import StarRating from '../../StarRating';
import AiComment from '../../atoms/AiComment';
import Txt from '../../atoms/Text';
import ReviewBox from './ReviewBox';

type ApplyReviewProps = {
  reviews: Review[];
  totalAvgScore: number;
};

export default function ApplyReview({ reviews, totalAvgScore }: ApplyReviewProps) {
  // AI Comment can be a future feature
  // const aiCommentText = "바다가 참 예뻐서 건강해지는 기분"; 

  return (
    <section className='flex w-full flex-col px-4'>
      <Txt weight='bold' className='mb-4 text-[20px]'>
        봉사후기
      </Txt>
      <div className='mb-3 flex w-full flex-col items-center pb-3'>
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
        {(reviews && reviews.length > 0) ? (
          reviews.map((review) => (
            <ReviewBox
              key={review.id}
              userName={review.userName}
              imageUrl={review.profileImage} // API response uses profileImage
              rate={review.rate}
              content={review.comment} // API response uses comment
            />
          ))
        ) : (
          <p className='text-center text-gray-500'>아직 작성된 후기가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
