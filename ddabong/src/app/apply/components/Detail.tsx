import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';

export default function Detail() {
  return (
    <div className='pt-[10px]'>
      <Txt weight='bold' className='text-Hana-Black pl-[30px] text-xl'>
        상세 정보
      </Txt>
      <div className='px-[26px]'>
        <Input
          placeholder='봉사 활동에 대한 상세 정보를 적어주세요'
          className='text-Hana-Black mt-3 w-full py-[11px] pl-[14px] text-base'
        />
      </div>
    </div>
  );
}
