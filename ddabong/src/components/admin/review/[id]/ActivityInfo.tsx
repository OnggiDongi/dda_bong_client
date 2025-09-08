import ActivityInfo from '@/components/ActivityInfo';
import Txt from '@/components/atoms/Text';

type Props = {
  title: string;
  endDate: string;
  category: string;
  imageUrl: string;
  recruitNum: number;
  applicantsNum: number;
};

export default function ActivityApplyInfo({
  title,
  endDate,
  category,
  imageUrl,
  recruitNum,
  applicantsNum,
}: Props) {
  return (
    <>
      <div className='mt-1 flex flex-col bg-white p-6'>
        <ActivityInfo
          title={title}
          category={category}
          endDate={endDate}
          imageUrl={imageUrl}
        />
        <div className='bg-Box-Line border-Box-Line mt-4 border-[0.5px]'></div>
        <div className='flex justify-end pt-1.5'>
          <Txt className='text-Logo-Mint'>총 봉사자 {applicantsNum}명</Txt>
        </div>
      </div>
    </>
  );
}
