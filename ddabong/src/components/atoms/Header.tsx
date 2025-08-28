import Image from 'next/image';
import Txt from '@/components/atoms/Text';

type Props = {
  title?: string;
  onBack?: () => void;
};

export default function TopBar({ title = '봉사 등록하기', onBack }: Props) {
  return (
    <header className='relative flex items-center justify-center bg-white'>
      <button
        type='button'
        onClick={onBack}
        className='absolute start-0 ml-[19px] pt-[25px] pb-[22px]'
        aria-label='뒤로가기'
      >
        <Image
          src='/icons/ic_arrow_back.svg'
          alt='뒤로가기'
          width={10}
          height={20}
          priority
        />
      </button>
      <Txt weight='semibold' className='pt-[23px] pb-[19px] text-xl'>
        {title}
      </Txt>
    </header>
  );
}
