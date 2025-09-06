'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';

export default function AdminSignInPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = 'http://localhost:8080';
  const router = useRouter();
  const { showToast } = useToast();

  async function formLogin(e: React.FormEvent) {
    e.preventDefault();
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    try {
      const { data } = await axios.post(
        baseUrl + '/users/signin',
        body.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      console.log(data);

      const { accessToken, refreshToken, name } = data ?? {};

      localStorage.setItem('accessToken', accessToken ?? '');
      localStorage.setItem('refreshToken', refreshToken ?? '');
      localStorage.setItem('name', name ?? '');

      router.push('/admin/home');
      showToast('로그인에 성공했습니다.', 'success');
    } catch (err) {
      console.error('로그인 실패:', err);
      showToast(
        '로그인에 실패했습니다. 이메일/비밀번호를 확인해 주세요.',
        'error'
      );
    }
  }

  return (
    <main className='flex flex-col items-center pt-25'>
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
          {/* 이메일. */}
          <div>
            <label className='block'>
              <Txt weight='semibold' className='text-Hana-Black text-xl'>
                이메일
              </Txt>
            </label>
            <Input
              type='email'
              placeholder='이메일'
              autoComplete='email'
              required
              maxLength={50}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className='text-Hana-Black placeholder:text-Icon-Detail mt-[10px] mb-[25px] h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-lg placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className='block'>
              <Txt weight='semibold' className='text-Hana-Black text-xl'>
                비밀번호
              </Txt>
            </label>
            <Input
              type='password'
              placeholder='비밀번호'
              autoComplete='current-password'
              required
              maxLength={50}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-Hana-Black placeholder:text-Icon-Detail mt-[10px] mb-[50px] h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-lg placeholder:font-[AppleSDGothicNeoM] placeholder:text-lg'
            />
          </div>

          {/* 로그인 버튼 */}

          <Button
            className='h-[45px] w-full font-[AppleSDGothicNeoSB] text-xl'
            onClick={formLogin}
            type='submit'
          >
            로그인
          </Button>

          {/* 회원가입으로 이동 */}
          <div className='flex items-center justify-center pt-[30px]'>
            <Txt
              weight='medium'
              className='text-Icon-Detail text-base leading-none'
            >
              가입한 계정이 없으신가요?
            </Txt>

            <Link href='/admin/signup' className='ml-[14px] pb-1'>
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
