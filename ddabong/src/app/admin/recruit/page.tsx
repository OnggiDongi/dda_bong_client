'use client';

import type { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { privateClient } from '@/lib/openapi-client';
import EmptyRecruitment from '@/components/admin/recruit/EmptyRecruitment';
import RecruitmentList from '@/components/admin/recruit/RecruitmentList';
import BottomButton from '@/components/atoms/BottomButton';
import TopBar from '../../../components/admin/recruit/TopBar';

const CATEGORY_REVERSE_MAP: { [key: string]: string } = {
  LIVING: '생활',
  EDUCATION: '교육',
  SAFETY: '보건',
  CULTURE: '문화',
  ENVIRONMENT: '환경',
  PUBLIC: '행정',
  RURALAREA: '농어촌',
};

type ActivityPost = components['schemas']['ActivityResponseDTO'];

const fetchRecruitments = async (): Promise<ActivityPost[] | null> => {
  const { data, error } = await privateClient.GET('/activity');
  if (error) {
    throw new Error(JSON.stringify(error));
  }
  return data as unknown as ActivityPost[] | null;
};

export default function RecruitPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: pageData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recruitments'],
    queryFn: fetchRecruitments,
  });

  const handleSelectRecruitment = (id: number) => {
    setSelectedId(id);
    console.log('Selected recruitment ID:', id);
  };

  const recruitments = pageData || [];
  const hasRecruitment = recruitments && recruitments.length > 0;

  const formattedRecruitments =
    recruitments
      ?.map((r) => ({
        id: r.id!,

        title: r.title!,
        category: CATEGORY_REVERSE_MAP[r.category!] || r.category!,
        content: r.content!,
      }))
      .filter((r) => r.id != null && r.title != null && r.category != null) ??
    [];

  console.log('formattedRecruitments:', formattedRecruitments);

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className='relative flex h-screen w-full flex-col'>
      <TopBar />
      <div className='bg-page-gradient flex-1 overflow-y-auto px-4 pb-24'>
        {hasRecruitment ? (
          <RecruitmentList
            recruitments={formattedRecruitments}
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
