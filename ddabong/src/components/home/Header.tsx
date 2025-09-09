'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { UseAxiosWithAuth } from '@/hooks/axios/useAxiosWithAuth';
import Image from 'next/image';
import { useState } from 'react';
import Txt from '@/components/atoms/Text';
import Modal from '../atoms/modal';

export default function Header() {
  const axiosAuth = UseAxiosWithAuth();
  const { showToast } = useToast();
  const [logoutOpen, setLogoutOpen] = useState(false);

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('firstLogin');

    axiosAuth
      .post('/users/logout')
      .then(() => {
        showToast('로그아웃 되었습니다.', 'success');
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  }

  return (
    <header className='flex flex-col'>
      <button
        className='ml-auto text-xs text-gray-500 underline hover:text-gray-700'
        type='button'
        onClick={() => {
          setLogoutOpen(true);
        }}
      >
        로그아웃
      </button>
      <div className='flex flex-row items-center gap-4 pt-7 pb-3'>
        <Image
          src='/icons/ic_logo.svg'
          alt='따봉 로고'
          width={110}
          height={50}
        />
        <div className='pt-4'>
          <Txt className='text-Modal-font block text-sm'>
            당신의 따봉 하나, 세상에 온기 하나
          </Txt>
        </div>
      </div>
      {logoutOpen && (
        <Modal
          title='로그아웃'
          description='정말 로그아웃 하시겠습니까?'
          onCancel={() => setLogoutOpen(false)}
          onConfirm={logout}
          cancelText='아니오'
          confirmText='네'
          confirmColor='pink'
        />
      )}
    </header>
  );
}
