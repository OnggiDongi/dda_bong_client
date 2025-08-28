'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';

export default function SeniorSignInPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const baseUrl = 'http://localhost:8080';

  async function formLogin() {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    const response = await fetch(baseUrl + '/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(), // 문자열로 변환해서 전달
    });

    const data = await response.json();
    console.log(data);
  }

  async function kakaoLogin() {
    window.open(`${baseUrl}/oauth2/authorization/kakao`, '_self');
  }

  return (
    <main className='flex flex-col items-center pt-25'>
      {/* 로고 */}
      <Image
        src='/icons/ic_logo.svg'
        alt='따봉 로고'
        width={150}
        height={90}
        className='object-contain pt-[18px]'
        priority
      />

      {/* 폼 컨테이너 */}
      <div className='w-[300px] pt-11'>
        <form className='flex flex-col'>
          {/* 이메일 */}
          <label className='block'>
            <Txt weight='semibold' className='text-Hana-Black text-2xl'>
              이메일
            </Txt>
            <Input
              type='email'
              placeholder='이메일'
              autoComplete='email'
              required
              maxLength={50}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className='text-Hana-Black placeholder:text-Icon-Detail mt-[10px] mb-[25px] h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
              aria-label='이메일 입력'
            />
          </label>

          {/* 비밀번호 */}
          <label className='block'>
            <Txt weight='semibold' className='text-Hana-Black text-2xl'>
              비밀번호
            </Txt>
            <Input
              type='password'
              placeholder='비밀번호'
              autoComplete='current-password'
              required
              maxLength={50}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-Hana-Black placeholder:text-Icon-Detail mt-[10px] mb-[45px] h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
              aria-label='비밀번호 입력'
            />
          </label>

          {/* 로그인 버튼 */}
          <Link href='/home' className='mb-[25px] h-[50px] w-full'>
            <Button
              className='h-[50px] w-full font-[AppleSDGothicNeoSB] text-[26px]'
              onClick={formLogin}
            >
              로그인
            </Button>
          </Link>

          {/* 카카오 버튼 */}
          <Button
            className='bg-kakao text-Hana-Black h-[50px] w-full gap-2 font-[AppleSDGothicNeoSB] text-xl'
            onClick={kakaoLogin}
          >
            <Image
              src='/icons/ic_kakao.svg'
              alt='카카오 아이콘'
              width={22}
              height={22}
              className='object-contain'
            />
            카카오톡으로 로그인하기
          </Button>

          {/* 회원가입으로 이동 */}
          <div className='flex items-center justify-center pt-[25px]'>
            <Txt weight='medium' className='text-Icon-Detail text-xl'>
              가입한 계정이 없으신가요?
            </Txt>
            <Link href='/signUp/senior' className='pb-1 pl-[14px]'>
              <Txt
                weight='medium'
                className='text-Icon-Detail align-middle text-xl underline underline-offset-2'
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
