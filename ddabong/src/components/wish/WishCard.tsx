'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
}

export default function WishCard({
  id,
  imageUrl,
  category,
  title,
  endAt,
  location,
  isWished: initialIsWished,
}: WishCardProps) {
  const [isWished, setIsWished] = useState(initialIsWished);

  const handleWishClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Link로의 전파를 막음
    e.preventDefault();

    // 화면의 하트 상태를 즉시 업데이트
    const newWishState = !isWished;
    setIsWished(newWishState);

    // --- API 호출 최적화 로직 ---
    // 현재 상태가 초기 상태와 다를 경우에만 API 호출을 준비합니다.
    if (newWishState !== initialIsWished) {
      if (newWishState === false) {
        // 최종 상태가 '찜 해제'일 경우
        // TODO: 찜 해제 API 호출 (DELETE /users/likes/{id})
      } else {
        // 최종 상태가 '다시 찜'일 경우
        // TODO: 찜하기 API 호출 (POST /users/likes/{id})
      }
    }
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
