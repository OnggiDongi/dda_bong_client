import Image from 'next/image';
import Badge from './atoms/Badge';
import Txt from './atoms/Text';

type Props = {
  imageUrl: string;
  category: string;
  title: string;
  endDate: string;
};
export default function ActivityInfo({
  imageUrl,
  category,
  title,
  endDate,
}: Props) {
  return (
    <>
      <div className='flex pb-4'>
        <Image
          src={imageUrl}
          alt='acivity_image_url'
          width={86}
          height={86}
          className='h-[86px] w-[86px] rounded-xl object-cover'
        />
        <div className='flex flex-1 flex-col items-start pl-4'>
          <Badge text={category} className='inline-block leading-tight'></Badge>
          <Txt className='flex-2 pt-3 text-lg'>{title}</Txt>
          <Txt className='text-Icon-Detail flex-3'>{endDate}</Txt>
        </div>
      </div>
    </>
  );
}
