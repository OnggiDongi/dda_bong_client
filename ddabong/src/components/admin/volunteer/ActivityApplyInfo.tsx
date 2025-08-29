import Image from 'next/image';
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
        <div className='flex pb-4'>
          {/* <div></div> */}
          <Image
            src={imageUrl}
            alt='acivity_image_url'
            width={86}
            height={86}
            className='h-[86px] w-[86px] rounded-xl object-cover'
          />
          <div className='flex flex-1 flex-col items-start pl-4'>
            <Badge text='농어촌' className='inline-block leading-tight'></Badge>
            <Txt className='flex-2 pt-3 text-lg'>{title}</Txt>
            <Txt className='text-Icon-Detail flex-3'>{endDate}</Txt>
          </div>
        </div>
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
