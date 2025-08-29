'use client';

import Image from 'next/image';
import { useState } from 'react';
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
            <div className='flex items-center'>
              <Image
                src='/icons/ic_ddabong.svg'
                alt='ic_ddabong'
                width={20}
                height={20}
                className='mr-1'
              />
              <Txt className='text-lg'>{totalRate.toFixed(1)}</Txt>

              <Button
                color='white'
                className='ml-2 w-auto'
                onClick={() => setToggle(!toggle)}
              >
                <Image
                  src='/icons/ic_arrow_back.svg'
                  alt='arrow'
                  width={8}
                  height={8}
                  className={toggle ? 'rotate-90' : 'rotate-[270deg]'}
                />
              </Button>
            </div>
            {toggle ? (
              <div className='flex items-center gap-3 pb-2.5'>
                {/* 성실도 */}
                <div className='flex items-center gap-1'>
                  <Txt weight='medium' className='text-Modal-font text-sm'>
                    성실도
                  </Txt>
                  <Image
                    src='/icons/ic_star_filled.svg'
                    alt='별'
                    width={18}
                    height={18}
                  />
                  <Txt className='text-Modal-font'>
                    {diligenceLevel.toFixed(1)}
                  </Txt>
                </div>

                {/* 친화력 */}
                <div className='flex items-center gap-1'>
                  <Txt weight='medium' className='text-Modal-font text-sm'>
                    친화력
                  </Txt>
                  <Image
                    src='/icons/ic_star_filled.svg'
                    alt='별'
                    width={18}
                    height={18}
                  />
                  <Txt className='text-Modal-font'>{attitude.toFixed(1)}</Txt>
                </div>

                {/* 건강 상태 */}
                <div className='flex items-center gap-1'>
                  <Txt weight='medium' className='text-Modal-font text-sm'>
                    건강 상태
                  </Txt>
                  <Image
                    src='/icons/ic_star_filled.svg'
                    alt='별'
                    width={18}
                    height={18}
                  />
                  <Txt className='text-Modal-font'>
                    {healthStatus.toFixed(1)}
                  </Txt>
                </div>
              </div>
            ) : (
              <div className='pt-2.5'></div>
            )}
            <AiComment text={aiReview} className='mb-3 w-80' />
          </div>
        </div>
      </div>
    </>
  );
}
