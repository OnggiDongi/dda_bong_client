import Image from 'next/image';
import Txt from '@/components/atoms/Text';

export default function TopBar() {
  return (
    <header className='relative flex items-center justify-center'>
      <Image
        src='/icons/ic_arrow_back.svg'
        alt='뒤로가기'
        width={10}
        height={20}
        className='absolute start-0 pt-[25px] pb-[22px] ml-[19px]'
      />
      <Txt
        weight='bold'
        className='pt-[23px] pb-[19px] text-xl text-Hana-Black'
      >
        봉사 등록하기
      </Txt>
    </header>
  );
}
