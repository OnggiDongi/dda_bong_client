'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';
import DatePicker from '@/components/common/DatePicker';

export default function SeniorSignUpPage() {
  const [joinDate, setJoinDate] = useState<Date>(new Date());
  return (
    <main className='flex flex-col items-center pt-[54px]'>
      {/* 로고 */}
      <Image
        src='/icons/ic_logo.svg'
        alt='따봉 로고'
        width={100}
        height={60}
        className='object-contain pt-[18px]'
        priority
      />

      {/* 폼 컨테이너 */}
      <div className='w-[300px]'>
        <form className='flex flex-col gap-2'>
          {/* 이름 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black block pb-2 text-2xl'
            >
              이름
            </Txt>
            <Input
              type='text'
              placeholder='이름을 입력해주세요'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
              aria-label='이름 입력'
            />
          </label>

          {/* 생년월일 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black block pb-2 text-2xl'
            >
              생년월일
            </Txt>
            <DatePicker value={joinDate} onChange={setJoinDate} />
          </label>

          {/* 이메일 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black block pb-2 text-2xl'
            >
              이메일
            </Txt>
            <Input
              type='email'
              placeholder='이메일을 입력해주세요'
              autoComplete='email'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
              aria-label='이메일 입력'
            />
          </label>

          {/* 비밀번호 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black block pb-2 text-2xl'
            >
              비밀번호
            </Txt>
            <Input
              type='password'
              placeholder='비밀번호를 입력해주세요'
              autoComplete='new-password'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
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
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
              aria-label='비밀번호 확인 입력'
            />
          </label>

          {/* 전화번호 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black block pb-2 text-2xl'
            >
              전화번호
            </Txt>
            <Input
              type='tel'
              placeholder='전화번호를 입력해주세요'
              required
              maxLength={13}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
              aria-label='전화번호 입력'
            />
          </label>

          {/* 회원가입 버튼 */}
          <Button
            type='submit'
            className='mt-[30px] h-[50px] w-full font-[AppleSDGothicNeoSB] text-[26px]'
          >
            회원가입
          </Button>

          {/* 로그인으로 이동 */}
          <div className='flex items-center justify-center gap-2 pt-4'>
            <Txt weight='medium' className='text-Icon-Detail text-xl'>
              계정이 이미 있으신가요?
            </Txt>
            <Link href='/signIn/senior'>
              <Txt
                weight='medium'
                className='text-Icon-Detail align-middle text-xl underline underline-offset-2'
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
