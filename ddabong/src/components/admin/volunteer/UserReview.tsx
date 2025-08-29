import ActivityInfo from '@/components/ActivityInfo';

type Props = {
  title: string;
  category: string;
  endDate: string;
  imageUrl: string;
};
export default function UserReview({
  title,
  category,
  endDate,
  imageUrl,
}: Props) {
  return (
    <>
      <div className='bg-white pl-6'>
        <ActivityInfo
          title={title}
          category={category}
          endDate={endDate}
          imageUrl={imageUrl}
        />
      </div>
    </>
  );
}
