import Txt from '@/components/atoms/Text';
import UserReview from './UserReview';

type Props = {
  count: number;
  userName: string;
  reviews: {
    id: number;
    title: string;
    category: string;
    endDate: string;
    imageUrl: string;
    totalRate: number;
    diligenceLevel: number;
    healthStatus: number;
    attitude: number;
    content: string;
  }[];
};

export default function UserReviewList({ count, userName, reviews }: Props) {
  return (
    <>
      <div className='flex flex-col'>
        <div className='mt-2 flex h-16 items-center bg-white'>
          <Txt className='ml-6 text-lg' weight='bold'>
            {userName} 님의 평가
          </Txt>
          <Txt className='text-Modal-font pl-3 text-lg'>{count}개</Txt>
        </div>
        {reviews.map((review) => (
          <UserReview
            key={review.id}
            title={review.title}
            category={review.category}
            endDate={review.endDate}
            imageUrl={review.imageUrl}
            totalRate={review.totalRate}
            diligenceLevel={review.diligenceLevel}
            attitude={review.attitude}
            healthStatus={review.healthStatus}
            content={review.content}
          />
        ))}
      </div>
    </>
  );
}
