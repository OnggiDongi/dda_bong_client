'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, setToken] = useState('');

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      setToken(accessToken);

      fetchData(accessToken);

      router.push('/home');
    }
  }, [searchParams, router]);

  const fetchData = async (token: string) => {
    try {
      console.log(token);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login/kakao`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const { accessToken, refreshToken, name, firstLogin } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('name', name);
      localStorage.setItem('firstLogin', firstLogin);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Image
        src='/video/loading.gif'
        alt='로딩 중'
        width={130}
        height={130}
        unoptimized
      />
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='mt-20 flex flex-col items-center justify-center text-lg'>
          <Image
            src='/video/loading.gif'
            alt='로딩 중'
            width={130}
            height={130}
            unoptimized
          />
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
