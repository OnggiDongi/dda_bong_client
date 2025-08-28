'use client';

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      setToken(accessToken);

      fetchData(accessToken);

      // router.replace('/home');
      router.push('/home');
    }
  }, [searchParams, router]);

  const fetchData = async (token: string) => {
    try {
      console.log(token);
      const response = await axios.get(
        'http://localhost:8080/users/login/kakao',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mt-20 text-center text-lg'>로그인 처리 중입니다...</div>
  );
}
