'use client';

import Link from 'next/link';
import { useState } from 'react';
import TopBar from '../../../components/admin/recruit/TopBar';
import BottomButton from '@/components/atoms/BottomButton';
import RecruitmentList from '@/components/admin/recruit/RecruitmentList';
import EmptyRecruitment from '@/components/admin/recruit/EmptyRecruitment';

// 더미더미더미더미더미더미데이터
const mockRecruitments = [
  {
    id: 1,
    category: '환경',
    title: '동해 바다 쓰레기 줍기',
    content: '집중 붕따리 봉을 위한 것입니다.',
  },
  {
    id: 2,
    category: '환경',
    title: '깨끗한 우리 동네 만들기',
    content: '거리를 청소하여 쾌적한 개미를 만듭니다.',
  },
  {
    id: 3,
    category: '교육',
    title: '아이들의 꿈을 응원하는 멘토링',
    content: '아동들에게 학습 개미를 제공합니다.',
  },
  {
    id: 4,
    category: '환경',
    title: '어르신과 함께하는 즐거운 시간',
    content: '어르신들을 위해 말벗 개미를 드립니다.',
  },
];

export default function RecruitPage() {
  const hasRecruitment = mockRecruitments.length > 0;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelectRecruitment = (id: number) => {
    setSelectedId(id);
    console.log('Selected recruitment ID:', id);
  };

  return (
    <div className='relative flex h-screen w-full flex-col'>
      <TopBar />
      <div className='bg-page-gradient flex-1 overflow-y-auto px-4 pb-24'>
        {hasRecruitment ? (
          <RecruitmentList 
            recruitments={mockRecruitments} 
            selectedId={selectedId} 
            onSelectRecruitment={handleSelectRecruitment} 
          />
        ) : (
          <EmptyRecruitment />
        )}
      </div>
      <div className='absolute bottom-0 w-full'>
        <Link href={`/admin/recruit/write?id=${selectedId || ''}`} passHref>
          <BottomButton label='봉사 모집 글 작성하기' />
        </Link>
      </div>
    </div>
  );
}
