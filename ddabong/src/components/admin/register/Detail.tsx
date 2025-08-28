import Txt from '@/components/atoms/Text';

export default function Detail() {
  return (
    <div className='pt-[10px]'>
      <Txt weight='bold' className='pt-6 pl-[30px] text-xl'>
        상세 정보
      </Txt>
      <div className='mt-3 px-[26px]'>
        <textarea
          placeholder='봉사 활동에 대한 상세 정보를 적어주세요'
          required
          className='placeholder:text-Icon-Detail border-Box-Line h-[150px] w-full resize-none overflow-y-auto rounded-xl border bg-white py-[11px] pl-[14px] text-base focus:outline-none'
        />
      </div>
    </div>
  );
}
