import Image from 'next/image';
import Txt from '../atoms/Text';

//테스트 데이터
const UserData = { userName: '시별돌', volunHour: 35 };
export default function VolunProfile() {
  return (
    <section className='border-Logo-Mint flex h-[130px] w-[350px] items-center justify-center rounded-2xl border bg-white'>
      <div className='flex flex-col justify-center pr-11'>
        <Txt weight='bold' className='text-[22px]'>
          누적 봉사시간
        </Txt>
        <Txt weight='heavy' className='text-Logo-Mint text-[22px]'>
          {UserData.volunHour}시간
        </Txt>
      </div>
      <Image
        src={'/icons/ic_bigstarSong.svg'}
        alt={'누적봉사시간 별송이'}
        width={130}
        height={130}
        className='pb-0.5'
      />
    </section>
  );
}
