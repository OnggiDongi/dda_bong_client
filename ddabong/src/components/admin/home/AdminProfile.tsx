'use client';

import Image from 'next/image';
import Txt from '@/components/atoms/Text';

type Props = {
  username: string;
};

export default function AdminProfile({ username }: Props) {
  return (
    <div className='bg-1Q-Mint border-1Q-Mint-Line flex h-[90px] w-[350px] items-center justify-between gap-3 rounded-2xl border py-5 pl-7'>
      <div className='flex items-center'>
        <Image
          src='/icons/ic_senior_face.svg'
          alt='홈화면 별돌이'
          width={80}
          height={80}
          className='pt-1.5'
        />
        <div className='flex flex-col pl-2'>
          <Txt weight='extrabold' className='text-Hana-Black text-lg'>
            {username}
          </Txt>
          <Txt weight='semibold' className='text-Hana-Black text-lg'>
            관리자 계정입니다
          </Txt>
        </div>
      </div>
    </div>
  );
}
