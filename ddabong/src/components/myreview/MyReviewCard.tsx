'use client';

import Image from 'next/image';
import StarRating from '@/components/StarRating';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';

interface MyReviewCardProps {
  category: string;
  title: string;
  date: string;
  rating: number;
  imageUrl: string;
  content: string;
  onDelete: () => void;
}

const MyReviewCard = ({
  category,
  title,
  date,
  rating,
  imageUrl,
  content,
  onDelete,
}: MyReviewCardProps) => {
  return (
    <div className='py-5 pr-[22px] pl-6'>
      <div className='flex items-start justify-between'>
        <div className='min-w-0'>
          <Badge text={category} />
          <Txt className='text-Hana-Black block pt-[2px] text-xl'>{title}</Txt>

          <Txt className='text-Icon-Detail pt-[2px] font-[AppleSDGothicNeoM] text-lg'>
            {date}
          </Txt>

          <div className='pt-[23px] pb-[13px]'>
            <StarRating value={rating} readOnly size={20} />
          </div>
        </div>

        <div className='relative h-[125px] w-[125px] shrink-0 overflow-hidden rounded-xl'>
          <Image src={imageUrl} alt={title} fill className='object-cover' />
        </div>
      </div>

      <Txt className='text-Hana-Black text-[15px] leading-relaxed'>
        {content}
      </Txt>

      <div className='mt-3 flex justify-end'>
        <Button
          onClick={onDelete}
          className='bg-Icon-Detail h-[35px] w-[65px]'
          textClassName='text-lg'
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default MyReviewCard;
