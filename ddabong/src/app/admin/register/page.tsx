'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';
import Category from '../../../components/admin/register/Category';
import Detail from '../../../components/admin/register/Detail';
import Title from '../../../components/admin/register/Title';
import TopBar from '../../../components/admin/register/TopBar';

export default function RegisterPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');

  const handleRegister = () => {
    console.log({ title, category, detail });
    router.push('/admin/home');
  };

  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='bg-page-gradient flex-1 overflow-y-auto'>
        <TopBar />
        <Title value={title} onChange={(e) => setTitle(e.target.value)} />
        <Txt weight='bold' className='mt-3 block pl-[30px] text-xl'>
          봉사 카테고리
        </Txt>
        <div className='px-[26px]'>
          <Category
            value={category}
            onValueChange={(value) => setCategory(value)}
          />
        </div>

        <Detail value={detail} onChange={(e) => setDetail(e.target.value)} />
      </div>
      <div className='bg-white p-4'>
        <Button className='bg-Logo-Mint w-full' onClick={handleRegister}>
          등록 완료
        </Button>
      </div>
    </div>
  );
}
