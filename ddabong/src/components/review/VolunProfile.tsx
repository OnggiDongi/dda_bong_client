import Image from 'next/image';
import Txt from '../atoms/Text';

type Props = {
  volunHour: number;
};

export default function VolunProfile({ volunHour }: Props) {
  return (
    <section className='border-Logo-Mint flex h-[130px] w-[350px] items-center justify-center rounded-2xl border bg-white'>
      <div className='flex flex-col justify-center pr-11'>
        <Txt weight='bold' className='text-[22px]'>
          누적 봉사 시간
        </Txt>
        <Txt weight='heavy' className='text-Logo-Mint text-[22px]'>
          {volunHour}시간
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
