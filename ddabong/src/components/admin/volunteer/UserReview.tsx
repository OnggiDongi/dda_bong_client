import ActivityInfo from '@/components/ActivityInfo';
import ReviewRating from '@/components/ReviewRating';
import Txt from '@/components/atoms/Text';

type Props = {
  title: string;
  category: string;
  endDate: string;
  imageUrl: string;
  totalRate: number;
  diligenceLevel: number;
  healthStatus: number;
  attitude: number;
  content: string;
};
export default function UserReview({
  title,
  category,
  endDate,
  imageUrl,
  totalRate,
  diligenceLevel,
  healthStatus,
  attitude,
  content,
}: Props) {
  return (
    <>
      <div className='mb-1 bg-white px-6 pt-4 pb-5'>
        <ActivityInfo
          title={title}
          category={category}
          endDate={endDate}
          imageUrl={imageUrl}
        />
        <ReviewRating
          totalRate={totalRate}
          diligenceLevel={diligenceLevel}
          attitude={attitude}
          healthStatus={healthStatus}
        />
        <Txt weight='medium'>{content}</Txt>
      </div>
    </>
  );
}
