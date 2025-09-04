'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { useCreateActivityMutation } from '@/hooks/mutations/useActivityMutations';
import { components } from '@/types/openapi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminCategory from '@/components/admin/register/AdminCategory';
import Detail from '@/components/admin/register/Detail';
import Title from '@/components/admin/register/Title';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

type ActivityRequestDTO = components['schemas']['ActivityRequestDTO'];

export default function RegisterPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] =
    useState<ActivityRequestDTO['category']>('LIVING');
  const [detail, setDetail] = useState('');
  const { showToast } = useToast();
  const createActivity = useCreateActivityMutation();

  const handleRegister = () => {
    createActivity.mutate(
      {
        title,
        category,
        content: detail,
      },
      {
        onSuccess: () => {
          showToast('등록에 성공하였습니다.');
          router.push('/admin/home');
        },
      }
    );
  };

  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='bg-page-gradient flex-1 overflow-y-auto'>
        <TopBar bgColor='bg-page-background' />
        <Title value={title} onChange={(e) => setTitle(e.target.value)} />
        <Txt weight='bold' className='mt-3 block pl-[30px] text-xl'>
          봉사 카테고리
        </Txt>
        <div className='px-[26px]'>
          <AdminCategory
            value={category}
            onValueChange={(value) =>
              setCategory(value as ActivityRequestDTO['category'])
            }
          />
        </div>

        <Detail value={detail} onChange={(e) => setDetail(e.target.value)} />
      </div>
      <div className='bg-white p-4'>
        <Button
          className='bg-Logo-Mint w-full'
          onClick={handleRegister}
          disabled={createActivity.isPending}
        >
          등록 완료
        </Button>
      </div>
    </div>
  );
}
