import ReviewForm from '@/components/ReviewForm';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';
import Header from '@/components/atoms/TopBar';

export default async function Page() {
  const data = {
    category: '농어촌',
    title: '감자 농장에서 감자 캐기',
    date: '2025.09.16(화)',
    location: '강원도 안목해변',
  };

  return (
    <main className='flex min-h-screen flex-col'>
      <Header title='봉사 후기 작성' />
      <section className='bg-white px-[26px] py-[15px]'>
        <div className='border-Box-Line w-full border-b pb-2'>
          <Txt className='text-[22px]'>시별돌님</Txt>
        </div>
        <div className='flex items-center justify-between pt-[11px] pb-[7px]'>
          <Txt className='text-xl'>{data.title}</Txt>
          <Badge text={data.category} />
        </div>
        <Txt className='text-Icon-Detail text-lg'>
          {data.date}
          <br />
        </Txt>
        <Txt className='text-Icon-Detail text-lg'>{data.location}</Txt>
      </section>
      <ReviewForm /> {/* 별점/사진 업로드/제출 버튼인터랙션 */}
    </main>
  );
}
