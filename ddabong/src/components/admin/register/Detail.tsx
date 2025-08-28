import Txt from '@/components/atoms/Text';
import Textarea from '@/components/atoms/Textarea';

export default function Detail() {
  return (
    <div className='pt-[10px]'>
      <Txt weight='bold' className='pt-6 pl-[30px] text-xl'>
        상세 정보
      </Txt>
      <div className='mt-3 px-[26px]'>
        <Textarea
          rows={5}
          placeholder='봉사 활동에 대한 상세 정보를 적어주세요'
          className='border-Box-Line text-Hana-Black w-full rounded-xl border bg-white py-[11px] pl-[14px] text-base'
        />
      </div>
    </div>
  );
}
