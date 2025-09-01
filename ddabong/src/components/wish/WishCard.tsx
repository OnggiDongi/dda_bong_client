'use client';

import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';

interface WishCardProps {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  endAt: string;
  location: string;
  isWished: boolean;
  onToggleWish: (id: number) => void;
}

export default function WishCard({
  id,
  imageUrl,
  category,
  title,
  endAt,
  location,
  isWished,
  onToggleWish,
}: WishCardProps) {
  const handleWishClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Link로의 전파를 막음
    e.preventDefault();
    onToggleWish(id);
  };

  return (
    <Link href={`/apply/${id}`} className='block w-full'>
      <div className='flex gap-3 rounded-2xl bg-white p-4'>
        <Image
          src={imageUrl}
          alt={title}
          width={120}
          height={120}
          className='h-[120px] w-[120px] rounded-xl object-cover'
        />
        <div className='flex w-[190px] flex-col justify-between pl-1'>
          <div className='flex items-center justify-between'>
            <Badge text={category} />
            <button onClick={handleWishClick}>
              <Image
                src={
                  isWished
                    ? '/icons/ic_heart_filled.svg'
                    : '/icons/ic_heart_outline.svg'
                }
                alt='wish'
                width={17}
                height={16}
              />
            </button>
          </div>
          <Txt className='w-[190px] truncate text-lg'>{title}</Txt>
          <Txt className='text-Icon-Detail -mt-1 text-base'>{endAt}</Txt>
          <Txt className='text-Icon-Detail -mt-2 truncate text-base'>
            {location}
          </Txt>
        </div>
      </div>
    </Link>
  );
}
