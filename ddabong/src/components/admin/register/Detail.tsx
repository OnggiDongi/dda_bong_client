import Textarea from '@/components/atoms/Textarea';
import Txt from '@/components/atoms/Text';

export default function Detail() {
  return (
    <div className='pt-[10px]'>
      <Txt weight='bold' className='pt-6 pl-[30px] text-xl text-Hana-Black'>
        상세 정보
      </Txt>
      <div className='mt-3 px-[26px]'>
        <Textarea
          rows={5}
          placeholder='봉사 활동에 대한 상세 정보를 적어주세요'
          className='w-full rounded-xl border border-Box-Line bg-white py-[11px] pl-[14px] text-base text-Hana-Black'
        />
      </div>
    </div>
  );
}
