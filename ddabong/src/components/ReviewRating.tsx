'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from './atoms/Button';
import Txt from './atoms/Text';

type Props = {
  totalRate: number | null;
  diligenceLevel: number | null;
  healthStatus: number | null;
  attitude: number | null;
};
export default function ReviewRating({
  totalRate,
  diligenceLevel,
  healthStatus,
  attitude,
}: Props) {
  const [toggle, setToggle] = useState(false);
  const showDetail = totalRate !== null;

  return (
    <div className='min-h-[52px]'>
      <div className='flex items-center'>
        <Image
          src='/icons/ic_ddabong.svg'
          alt='ic_ddabong'
          width={20}
          height={20}
          className='mr-1'
        />
        <Txt className='text-base'>
          {totalRate ? totalRate.toFixed(1) : '-'}
        </Txt>

        {totalRate ? (
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
        ) : (
          <></>
        )}
      </div>
      {toggle && showDetail ? (
        <div className='flex items-center gap-3 pt-1 pb-3'>
          {[
            { label: '성실도', value: diligenceLevel },
            { label: '친화력', value: attitude },
            { label: '건강 상태', value: healthStatus },
          ].map(({ label, value }) =>
            value !== null ? (
              <div className='flex items-center gap-0.5' key={label}>
                <Txt weight='medium' className='text-Modal-font text-sm'>
                  {label}
                </Txt>
                <Image
                  src='/icons/ic_star_filled.svg'
                  alt='별'
                  width={13}
                  height={13}
                />
                <Txt className='text-Modal-font'>{value.toFixed(1)}</Txt>
              </div>
            ) : (
              <div className='flex items-center gap-1' key={label}></div>
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
