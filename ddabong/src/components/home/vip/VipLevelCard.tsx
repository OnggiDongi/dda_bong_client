'use client';

import Txt from '@/components/atoms/Text';
import { Progress } from '@/components/ui/progress';

interface VipLevelCardProps {
  userName: string;
  totalHours: number;
}

const VIP_THRESHOLD = 111;

export default function VipLevelCard({
  userName,
  totalHours,
}: VipLevelCardProps) {
  const level = totalHours >= VIP_THRESHOLD ? 'VIP' : 'SILVER';
  const hoursLeft = Math.max(0, VIP_THRESHOLD - totalHours);
  const progress = Math.min(100, (totalHours / VIP_THRESHOLD) * 100);

  return (
    <div className='px[19px] w-full rounded-xl bg-white pt-[33px] pb-[32px] text-center'>
      <div className='flex flex-col items-center'>
        <Txt weight='bold' className='text-[22px]'>
          {userName}님의 따봉 등급
        </Txt>
        <Txt weight='heavy' className='text-Logo-Mint pt-[9px] text-2xl'>
          {level}
        </Txt>
      </div>

      <div className='w-full px-5 pt-[17px]'>
        <Progress value={progress} className='' />
        <div className='flex justify-between text-lg'>
          <Txt weight='bold'>SILVER</Txt>
          <Txt weight='bold'>VIP</Txt>
        </div>
        <div className='pt-[21px]'>
          <Txt className='text-lg'>
            {level === 'VIP' ? (
              'VIP 등급을 달성했어요! 🎉'
            ) : (
              <>
                <Txt weight='bold' className='text-Logo-Mint'>
                  111시간
                </Txt>
                까지{` `}
                <Txt weight='bold' className='text-Logo-Mint'>
                  {hoursLeft}시간
                </Txt>
                {` `}남았어요!
              </>
            )}
          </Txt>
        </div>
      </div>
    </div>
  );
}
