'use client';

import Image from 'next/image';
import Txt from '@/components/atoms/Text';
import Button from '../atoms/Button';

type Props = {
  username: string;
  tier: string;
  totalHours: number;
};

export default function ProfileCard({ username, tier, totalHours }: Props) {
  return (
    <Button
      borderColor='mint2'
      className='bg-1Q-Mint flex h-[90px] w-[350px] items-center justify-between rounded-2xl pr-[11px] pl-[13px]'
    >
      <div className='divide-1Q-Mint-Line flex flex-1 items-center justify-between divide-x'>
        <div className='flex items-center'>
          <Image
            src='/icons/ic_senior_face.svg'
            alt='홈화면 별돌이'
            width={80}
            height={80}
          />
          <div className='flex flex-col text-center'>
            <Txt weight='extrabold' className='text-Hana-Black text-xl'>
              {username}
            </Txt>
            <Txt weight='heavy' className='text-Modal-font text-base'>
              {tier}
            </Txt>
          </div>
          <div className='border-1Q-Mint-Line flex items-center gap-3 border-r pr-4'></div>
        </div>
        <div className='flex flex-col text-center'>
          <Txt weight='semibold' className='text-Hana-Black text-xl'>
            누적 봉사 시간
          </Txt>
          <Txt weight='heavy' className='text-Hana-Green text-xl'>
            {totalHours}시간
          </Txt>
        </div>
      </div>
      <Image
        src='/icons/ic_next_green.svg'
        alt='홈화면 별돌이'
        width={8}
        height={16}
        className='pl-[3px]'
      />
    </Button>
  );
}
