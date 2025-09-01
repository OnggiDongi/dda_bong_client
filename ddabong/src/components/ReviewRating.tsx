'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from './atoms/Button';
import Txt from './atoms/Text';

type Props = {
  totalRate: number;
  diligenceLevel: number;
  healthStatus: number;
  attitude: number;
};
export default function ReviewRating({
  totalRate,
  diligenceLevel,
  healthStatus,
  attitude,
}: Props) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className='flex items-center'>
        <Image
          src='/icons/ic_ddabong.svg'
          alt='ic_ddabong'
          width={20}
          height={20}
          className='mr-1'
        />
        <Txt className='text-base'>{totalRate.toFixed(1)}</Txt>

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
            <Txt className='text-Modal-font'>{diligenceLevel.toFixed(1)}</Txt>
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
            <Txt className='text-Modal-font'>{healthStatus.toFixed(1)}</Txt>
          </div>
        </div>
      ) : (
        <div className='pt-2.5'></div>
      )}
    </>
  );
}
