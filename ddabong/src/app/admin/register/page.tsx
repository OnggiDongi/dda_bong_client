'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button';
import Category from '../../../components/admin/register/Category';
import Detail from '../../../components/admin/register/Detail';
import Title from '../../../components/admin/register/Title';
import TopBar from '../../../components/admin/register/TopBar';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/admin/home');
  };

  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='bg-page-gradient flex-1 overflow-y-auto'>
        <TopBar />
        <Title />
        <Category />
        <Detail />
      </div>
      <div className='bg-white p-4'>
        <Button className='bg-Logo-Mint w-full' onClick={handleRegister}>
          등록 완료
        </Button>
      </div>
    </div>
  );
}
