import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';

export default function AdminSignInPage() {
  return (
    <main className='bg-Page-Background flex min-h-screen flex-col items-center pt-25'>
      {/* 로고 */}
      <Image
        src='/icons/ic_logo.svg'
        alt='따봉 로고'
        width={150}
        height={90}
        className='mt-[18px] object-contain'
        priority
      />

      {/* 폼 컨테이너 */}
      <div className='mt-[44px] w-[300px]'>
        <form className='flex flex-col'>
          {/* 이메일 */}
          <label className='block'>
            <Txt weight='semibold' className='text-Hana-Black text-xl'>
              이메일
            </Txt>
            <Input
              type='email'
              placeholder='이메일'
              autoComplete='email'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail mt-[10px] mb-[25px] h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-lg placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
              aria-label='이메일 입력'
            />
          </label>

          {/* 비밀번호 */}
          <label className='block'>
            <Txt weight='semibold' className='text-Hana-Black text-xl'>
              비밀번호
            </Txt>
            <Input
              type='password'
              placeholder='비밀번호'
              autoComplete='current-password'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail mt-[10px] mb-[50px] h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-lg placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
              aria-label='비밀번호 입력'
            />
          </label>

          {/* 로그인 버튼 */}
          <Link href='/home'>
            <Button className='h-[45px] w-full font-[AppleSDGothicNeoSB] text-xl'>
              로그인
            </Button>
          </Link>

          {/* 회원가입으로 이동 */}
          <div className='mt-[30px] flex items-center justify-center'>
            <Txt
              weight='medium'
              className='text-Icon-Detail text-base leading-none'
            >
              가입한 계정이 없으신가요?
            </Txt>
            <Link href='/signUp/admin' className='mb-1 ml-[14px]'>
              <Txt
                weight='medium'
                className='text-Icon-Detail align-middle text-base leading-none underline underline-offset-2'
              >
                회원가입
              </Txt>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
