import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';

export default function Title() {
  return (
    <div className='pt-6'>
      <Txt weight='bold' className='text-Hana-Black pt-6 pl-[30px] text-xl'>
        봉사명
      </Txt>
      <div className='px-[26px]'>
        <Input
          placeholder='봉사명'
          className='border-Box-Line text-Hana-Black mt-3 w-full rounded-xl border bg-white py-[11px] pl-[14px] text-base'
        />
      </div>
    </div>
  );
}
