'use client';

import Badge from '../atoms/Badge';
import Txt from '../atoms/Text';
import ApplyGridBox from './ApplyGridBox';

export default function ApplyBody() {
  return (
    <section className='relative flex w-full flex-col'>
      <img
        className='h-[334px]'
        src='https://dimg.donga.com/wps/NEWS/IMAGE/2019/10/10/97803507.1.jpg'
      />
      <div className='px-4'>
        <div className='mt-[21px] mb-[10px] flex gap-1'>
          <Badge text='환경' />
          <Badge
            text='마감 31일 남음'
            bgColor='bg-white'
            textColor='text-Logo-Mint'
            borderColor='border-Logo-Mint'
          />
        </div>
        <Txt className='text-[21px]' weight='bold'>
          동해 바다 쓰레기 줍기
        </Txt>
        <div className='mt-[21px] grid grid-cols-2 gap-x-1 gap-y-7'>
          <ApplyGridBox
            iconSrc='/icons/ic_home.svg'
            iconAlt='home icon'
            lines={['개미인력', '022-7212-5669']}
          />
          <ApplyGridBox
            iconSrc='/icons/ic_location.svg'
            iconAlt='location icon'
            lines={['강원도', '안목해변']}
          />
          <ApplyGridBox
            iconSrc='/icons/ic_capacity.svg'
            iconAlt='capacity icon'
            lines={['모집인원', '10명']}
          />
          <ApplyGridBox
            iconSrc='/icons/ic_date.svg'
            iconAlt='date icon'
            lines={['2025.09.16', '13:00 - 21:00']}
          />
        </div>
        <div className='my-5 h-[1px] w-full bg-gray-200'></div>
        <Txt className='text-[19px]' weight='medium'>
          깨끗한 동해 바다를 만들기 위해 함께할 봉사자를 모집합니다.
          <br />
          <br />
          안목해변에서 쓰레기 줍기와 분리배출 활동을 진행하며, 참여하신 분들께는
          뜻깊은 경험이 주어집니다.
          <br />
          <br />
          바다를 지키는 손길에 많은 참여 부탁드립니다!
        </Txt>
      </div>
    </section>
  );
}
