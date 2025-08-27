'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';

export default function AdminSignUpPage() {
  return (
    <main className='flex flex-col items-center pt-[54px]'>
      {/* 로고 */}
      <Image
        src='/icons/ic_logo.svg'
        alt='따봉 로고'
        width={100}
        height={60}
        className='mt-[18px] object-contain'
        priority
      />

      {/* 폼 컨테이너 */}
      <div className='w-[300px]'>
        <form className='flex flex-col gap-2'>
          {/* 이름 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black mb-2 block text-xl'
            >
              기관명
            </Txt>
            <Input
              type='text'
              placeholder='기관명을 입력해주세요'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail mb-5 h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-lg placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
              aria-label='이름 입력'
            />
          </label>

          {/* 이메일 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black mb-2 block text-xl'
            >
              이메일
            </Txt>
            <Input
              type='email'
              placeholder='이메일을 입력해주세요'
              autoComplete='email'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail tex-lg mb-5 h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
              aria-label='이메일 입력'
            />
          </label>

          {/* 비밀번호 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black mb-2 block text-xl'
            >
              비밀번호
            </Txt>
            <Input
              type='password'
              placeholder='비밀번호를 입력해주세요'
              autoComplete='new-password'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-lg placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
              aria-label='비밀번호 입력'
            />
          </label>

          {/* 비밀번호 확인 */}
          <label className='block'>
            <Input
              type='password'
              placeholder='비밀번호를 확인해주세요'
              autoComplete='new-password'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail mb-5 h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-lg placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
              aria-label='비밀번호 확인 입력'
            />
          </label>

          {/* 전화번호 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black mb-2 block text-xl'
            >
              전화번호
            </Txt>
            <Input
              type='tel'
              placeholder='전화번호를 입력해주세요'
              required
              maxLength={13}
              className='text-Hana-Black placeholder:text-Icon-Detail mb-5 h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-lg placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
              aria-label='전화번호 입력'
            />
          </label>

          {/* 회원가입 버튼 */}
          <Button
            type='submit'
            className='mt-[30px] h-[50px] w-full font-[AppleSDGothicNeoSB] text-xl'
          >
            회원가입
          </Button>

          {/* 로그인으로 이동 */}
          <div className='mt-4 flex items-center justify-center'>
            <Txt
              weight='medium'
              className='text-Icon-Detail text-base leading-none'
            >
              계정이 이미 있으신가요?
            </Txt>
            <Link href='/signIn/admin' className='mb-1 ml-[14px]'>
              <Txt
                weight='medium'
                className='text-Icon-Detail align-middle text-base leading-none underline underline-offset-2'
              >
                로그인
              </Txt>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
