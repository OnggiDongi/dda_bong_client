'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReviewRating from './ReviewRating';
import AiComment from './atoms/AiComment';
import Badge from './atoms/Badge';
import Button from './atoms/Button';
import Txt from './atoms/Text';

type Props = {
  userName: string;
  imageUrl: string;
  status: string;
  totalRate: number;
  diligenceLevel: number;
  healthStatus: number;
  attitude: number;
  aiReview: string;
};

export default function ActivityReview({
  userName,
  imageUrl,
  status,
  totalRate,
  diligenceLevel,
  healthStatus,
  attitude,
  aiReview,
}: Props) {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className='mt-1 flex flex-col items-center bg-white'>
        <div className='mt-5 mb-2 flex'>
          <Image
            src={imageUrl}
            alt='user_profile_url'
            width={48}
            height={48}
            className='h-[48px] w-[48px] rounded-3xl object-cover'
          />
          <div className='flex-1 pl-3'>
            <div className='flex justify-between'>
              <Txt className='text-lg'>{userName}</Txt>
              {status == 'PENDING' ? (
                <div>
                  <Button
                    color='white'
                    className='ml-2 h-auto w-auto'
                    textClassName='leading-none flex items-center'
                  >
                    <Badge
                      text='거절'
                      bgColor='white'
                      borderColor='border-Logo-Pink'
                      textClassName='text-Logo-Pink'
                      className='px-4'
                    />
                  </Button>{' '}
                  <Button
                    color='white'
                    className='ml-2 h-auto w-auto'
                    textClassName='leading-none flex items-center'
                  >
                    <Badge
                      text='수락'
                      bgColor='white'
                      borderColor='border-Logo-Mint'
                      textClassName='text-Logo-Mint'
                      className='px-4'
                    />
                  </Button>
                </div>
              ) : status == 'APPROVED' ? (
                <div>
                  <Badge
                    text='거절'
                    bgColor='white'
                    textClassName='text-white'
                    className='px-4 py-0.5'
                  />{' '}
                  <Badge
                    text='수락'
                    bgColor='bg-Logo-Mint'
                    borderColor='border-Logo-Mint'
                    textClassName='text-white'
                    className='px-4 py-0.5'
                  />
                </div>
              ) : (
                <div>
                  <Badge
                    text='거절'
                    bgColor='white'
                    textClassName='text-white'
                    className='px-4 py-0.5'
                  />{' '}
                  <Badge
                    text='거절'
                    bgColor='bg-Logo-Pink'
                    textClassName='text-white'
                    className='px-4 py-0.5'
                  />
                </div>
              )}
            </div>
            <ReviewRating
              totalRate={totalRate}
              diligenceLevel={diligenceLevel}
              attitude={attitude}
              healthStatus={healthStatus}
            />
            <AiComment text={aiReview} className='mb-3 w-80' />
          </div>
        </div>
      </div>
    </>
  );
}
