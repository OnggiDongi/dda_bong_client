import Image from 'next/image';
import Link from 'next/link';
import InfoCard from '@/components/InfoCard';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';

export default function MyPage() {
  const user = {
    name: '시별돌',
    email: 'sibd@naver.com',
    birth: '1968.09.08',
    grade: 'SILVER',
    profile: '/icons/beeber.svg',
  };

  return (
    <main className='mx-auto flex w-full max-w-[430px] flex-col'>
      <section className='relative flex items-center justify-between px-[47px] pt-[67px] pb-10'>
        <div>
          <Txt className='text-Hana-Black text-3xl leading-[40px] font-extrabold'>
            {user.name}
            <span className='ml-1'>님의</span>
            <br /> 따봉
          </Txt>
          <div className='flex gap-2 pt-[10px]'>
            <Badge
              text='농어촌'
              weight='bold'
              className='h-[30px] w-18 py-1'
              textClassName='text-xl'
            />
            <Badge
              bgColor='bg-Logo-Pink'
              text='파주시'
              weight='bold'
              className='h-[30px] w-18 py-1'
              textClassName='text-xl'
            />
          </div>
        </div>
        <div className='shrink-0 pt-5'>
          <div className='relative h-[88px] w-[88px] overflow-hidden rounded-full ring-1 ring-black/5'>
            <Image
              src={user.profile}
              alt='프로필 이미지'
              fill
              sizes='88px'
              priority
              className='object-cover'
            />
          </div>
        </div>
      </section>

      {/* 내 정보 + 카드 */}
      <section className='px-[26px]'>
        <div className='mt-6 flex items-center justify-between'>
          <Link
            href='/mypage/edit'
            className='flex items-center justify-between'
          >
            <Txt weight='heavy' className='text-Hana-Black pr-10 text-2xl'>
              내 정보
            </Txt>
            <Image
              src='/icons/ic_arrow_next.svg'
              alt='다음'
              width={12}
              height={16}
            />
          </Link>
        </div>

        <div className='pt-3'>
          <InfoCard
            items={[
              { label: '이름', value: user.name },
              { label: '이메일', value: user.email },
              { label: '생년월일', value: user.birth },
              { label: '내 등급', value: user.grade },
            ]}
            href={'/mypage/edit'}
          />
        </div>
        {/* 섹션 리스트 */}
        <section className='py-5 pt-10'>
          <Link
            href='/review'
            className='flex items-center justify-between pr-35'
          >
            <Txt weight='heavy' className='text-Hana-Black text-2xl'>
              나의 봉사 활동
            </Txt>
            <Image
              src='/icons/ic_arrow_next.svg'
              alt='다음'
              width={12}
              height={16}
            />
          </Link>
          <div className='bg-Modal-font/30 my-4 h-px w-full' />

          <Link
            href='/wish'
            className='flex items-center justify-between pr-25'
          >
            <Txt weight='heavy' className='text-Hana-Black text-2xl'>
              나의 찜한 봉사활동
            </Txt>
            <Image
              src='/icons/ic_arrow_next.svg'
              alt='다음'
              width={12}
              height={16}
            />
          </Link>
          <div className='bg-Modal-font/30 my-4 h-px w-full' />

          <Link
            href='/myreview'
            className='flex items-center justify-between pr-30'
          >
            <Txt weight='heavy' className='text-Hana-Black text-2xl'>
              나의 작성한 후기
            </Txt>
            <Image
              src='/icons/ic_arrow_next.svg'
              alt='다음'
              width={12}
              height={16}
            />
          </Link>
        </section>
      </section>

      {/* 하단 홈 버튼 (FAB) */}
      <Link
        href='/home'
        className='fixed bottom-10 left-1/2 z-50 -translate-x-1/2'
      >
        <div className='grid h-17 w-17 place-items-center rounded-full bg-white shadow-[0_0px_5px_rgba(0,0,0,0.15)]'>
          <Image
            src='/icons/ic_home.svg'
            alt='홈버튼'
            width={50}
            height={50}
            className='object-contain'
          />
        </div>
      </Link>
    </main>
  );
}
