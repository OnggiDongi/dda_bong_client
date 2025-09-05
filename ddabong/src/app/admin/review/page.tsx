'use client';

import { useState, useEffect } from 'react';
import { useGetMyActivityPosts } from '@/hooks/queries/useGetMyActivityPosts';
import VolunList from '@/components/admin/review/VolunList';
import TopBar from '@/components/atoms/TopBar';
import TabButton from '@/components/review/TabButton';
import Txt from '@/components/atoms/Text';


type Tab = 'apply' | 'history';

const CATEGORY_REVERSE_MAP: { [key: string]: string } = {
  LIVING: '생활',
  EDUCATION: '교육',
  SAFETY: '보건',
  CULTURE: '문화',
  ENVIRONMENT: '환경',
  PUBLIC: '행정',
  RURALAREA: '농어촌',
};

export default function ReviewListPage() {
  const [activeTab, setActiveTab] = useState<Tab>('apply');

  const { data: recruitingPosts, isLoading: isLoadingRecruiting, isError: isErrorRecruiting, error: errorRecruiting } = useGetMyActivityPosts(true);
  const { data: pastPosts, isLoading: isLoadingPast, isError: isErrorPast, error: errorPast } = useGetMyActivityPosts(false);

  const isLoading = isLoadingRecruiting || isLoadingPast;
  const isError = isErrorRecruiting || isErrorPast;

  const listData = activeTab === 'apply' ? recruitingPosts : pastPosts;

  useEffect(() => {
    if (recruitingPosts && recruitingPosts.length > 0) {
        console.log("First recruiting post data:", recruitingPosts[0]);
    }
    if (pastPosts && pastPosts.length > 0) {
        console.log("First past post data:", pastPosts[0]);
    }
  }, [recruitingPosts, pastPosts]);

  if (isLoading) {
    return (
        <main className='flex flex-col items-center gap-5'>
            <TopBar title='모집 봉사 이력' />
            <div className="flex-1 flex items-center justify-center"><Txt>Loading...</Txt></div>
        </main>
    );
  }

  if (isError) {
    console.error('Error fetching recruiting posts:', errorRecruiting);
    console.error('Error fetching past posts:', errorPast);
    return (
        <main className='flex flex-col items-center gap-5'>
            <TopBar title='모집 봉사 이력' />
            <div className="flex-1 flex items-center justify-center"><Txt>Error fetching data</Txt></div>
        </main>
    );
  }

  return (
    <main className='flex flex-col items-center gap-5'>
      <TopBar title='모집 봉사 이력' />

      <TabButton
        activeTab={activeTab}
        onChange={setActiveTab}
        labels={{ apply: '모집중인 공고', history: '지난내역' }}
      />

      <section className='w-full space-y-0.5'>
        {listData && listData.length > 0 ? (
          listData.map((item) => (
            <VolunList
              key={item.id}
              mode={activeTab}
              id={item.id}
              title={item.title}
              date={item.endAt}
              category={CATEGORY_REVERSE_MAP[item.category as string] || item.category || ''}
              imageUrl={item.imageUrl}
              recruitNum={item.capacity}
              applicantsNum={item.applicantNum}
              rating={item.totalAvgScore}
            />
          ))
        ) : (
          <div className="text-center py-20">
            <Txt>{activeTab === 'apply' ? '모집중인 공고가 없습니다.' : '지난 내역이 없습니다.'}</Txt>
          </div>
        )}
      </section>
    </main>
  );
}