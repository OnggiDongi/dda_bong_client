import Image from 'next/image';
import ActivityInfo from '@/components/ActivityInfo';
import Badge from '@/components/atoms/Badge';
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
          title='미녀들이랑 노는 봉사'
          category='농어촌'
          endDate='2025.09.01'
          imageUrl='https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/미녀들.jpg'
        />
        <div className='bg-Box-Line border-Box-Line border'></div>
        <div className='flex justify-end pt-1.5'>
          <Txt className='text-Logo-Mint'>
            지원 인원 {applicantsNum}/{recruitNum}
          </Txt>
        </div>
      </div>
    </>
  );
}
