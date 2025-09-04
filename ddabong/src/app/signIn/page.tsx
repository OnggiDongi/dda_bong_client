'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { fetchUserSummary } from '@/hooks/home/user';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';

export default function SeniorSignInPage() {
  const qc = useQueryClient();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loginStatus = localStorage.getItem('loginStatus');

      if (loginStatus == 'false') {
        showToast('아이디와 비밀번호가 올바르지 않습니다.');
      }
    }
  }, []);

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

      const { accessToken, refreshToken, name, firstLogin, role } = data ?? {};

      localStorage.setItem('accessToken', accessToken ?? '');
      localStorage.setItem('refreshToken', refreshToken ?? '');
      localStorage.setItem('name', name ?? '');
      localStorage.setItem('role', role ?? '');
      localStorage.setItem('firstLogin', firstLogin ?? '');
      localStorage.removeItem('loginStatus');

      // 홈에서 쓸 데이터 미리 받아 캐시에 넣기
      qc.prefetchQuery({
        queryKey: ['userSummary'],
        queryFn: fetchUserSummary,
      });
      showToast('로그인되었습니다.');
      router.push('/home');
    } catch (err) {
      console.error('로그인 실패:', err);
      localStorage.setItem('loginStatus', 'false');
      window.location.reload();
    }
  }

  async function kakaoLogin() {
    window.open(`${baseUrl}/oauth2/authorization/kakao`, '_self');
  }

  return (
    <main className='flex flex-col items-center pt-25'>
      {/* 로고 .*/}
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
          <div>
            <label className='block'>
              <Txt weight='semibold' className='text-Hana-Black text-2xl'>
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
              className='text-Hana-Black placeholder:text-Icon-Detail mt-[10px] mb-[25px] h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className='block'>
              <Txt weight='semibold' className='text-Hana-Black text-2xl'>
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
              className='text-Hana-Black placeholder:text-Icon-Detail mt-[10px] mb-[45px] h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
            />
          </div>

          {/* 로그인 버튼 */}
          <div className=''>
            <Button
              className='mt-[30px] h-[50px] w-full'
              onClick={formLogin}
              type='submit'
              textClassName='text-[26px]'
            >
              로그인
            </Button>
            <div className='py-2' />
            {/* 카카오 버튼 */}
            <Button
              className='bg-kakao h-[50px] w-full text-xl'
              textClassName='text-Hana-Black'
              onClick={kakaoLogin}
            >
              <div className='flex items-center gap-2'>
                <Image
                  src='/icons/ic_kakao.svg'
                  alt='카카오 아이콘'
                  width={38}
                  height={38}
                  className='object-contain'
                />
                <span>카카오톡으로 로그인하기</span>
              </div>
            </Button>
          </div>
          {/* 회원가입으로 이동 */}
          <div className='flex items-center justify-center pt-[25px]'>
            <Txt weight='medium' className='text-Icon-Detail text-xl'>
              가입한 계정이 없으신가요?
            </Txt>

            <Link href='/signUp' className='pb-1 pl-[14px]'>
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
