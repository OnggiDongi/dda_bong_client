import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';

export default function Title() {
  return (
    <div className='10px'>
      <Txt weight='bold' className='text-Hana-Black pt-6 pl-[30px] text-xl'>
        봉사명
      </Txt>
      <div className='px-[26px]'>
        <Input
          placeholder='봉사명'
          className='text-Hana-Black mt-3 w-full py-[11px] pl-[14px] text-base'
        />
      </div>
    </div>
  );
}
