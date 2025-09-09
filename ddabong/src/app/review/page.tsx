'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { UseAxiosWithAuth } from '@/hooks/axios/useAxiosWithAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TopBar from '@/components/atoms/TopBar';
import Modal from '@/components/atoms/modal';
import ReviewListCard from '@/components/review/ReviewList';
import TabButton from '@/components/review/TabButton';
import VolunProfile from '@/components/review/VolunProfile';

type Tab = 'apply' | 'history';

const CATEGORY_MAP: Record<string, string> = {
  LIVING: '생활',
  EDUCATION: '교육',
  SAFETY: '보건',
  CULTURE: '문화',
  ENVIRONMENT: '환경',
  PUBLIC: '행정',
  RURALAREA: '농어촌',
};

type BaseItem = {
  id: string;
  title: string;
  date: string;
  place: string;
  category: string;
  approve?: '승인 대기' | '승인 반려' | '승인 완료';
  image?: string;
  reviewed?: 'true' | 'false'; //리뷰 씀 , 안 씀
};

type getItem = {
  id: string;
  title: string;
  endAt: string;
  location: string;
  imageUrl?: string;
  category: string;
  status: string;
  hasReview: boolean;
};
export default function SeniorReviewListPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('apply');
  const { showToast } = useToast();
  const [applyList, setApplyList] = useState<BaseItem[]>([]);
  const [historyList, setHistoryList] = useState<BaseItem[]>([]);
  const axiosAuth = UseAxiosWithAuth();
  const [totalHour, setTotalHour] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosAuth.get(`/users/history`);

        if (res.data?.error) {
          showToast('봉사정보를 불러오지 못했습니다.');
          return;
        }

        const resUser = await axiosAuth.get(`/users`);
        if (resUser.data?.error) {
          showToast('유저정보를 불러오지 못했습니다.');
          return;
        }
        resUser.data?.totalHour && setTotalHour(resUser.data.totalHour);

        const todayStr = new Date()
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ');

        const tmpApply: BaseItem[] = [];
        const tmpHistory: BaseItem[] = [];

        (res.data as getItem[]).forEach((item) => {
          const reviewedBool = item.hasReview === true;

          // 날짜 비교: 동일 포맷이면 문자열 비교 가능
          const endAtStr =
            item.endAt.length === 10
              ? `${item.endAt} 00:00:00` // "YYYY-MM-DD"만 온 경우 시간 보정
              : item.endAt;

          const base: Omit<BaseItem, 'approve' | 'reviewed'> = {
            id: item.id,
            title: item.title,
            date: endAtStr.substring(0, 10),
            place: item.location,
            category: CATEGORY_MAP[item.category] || '기타',
            image: item.imageUrl ?? '/icons/ic_senior.svg',
          };

          if (endAtStr > todayStr) {
            // 신청 목록
            tmpApply.push({
              ...base,
              approve:
                item.status === 'PENDING'
                  ? '승인 대기'
                  : item.status === 'REJECTED'
                    ? '승인 반려'
                    : '승인 완료',
            });
          } else if (item.status === 'APPROVED') {
            // 히스토리 목록
            tmpHistory.push({
              ...base,
              reviewed: reviewedBool ? 'true' : 'false',
            });
          }
        });

        setApplyList(tmpApply);
        setHistoryList(tmpHistory);
      } catch {
        showToast('봉사정보를 불러오지 못했습니다.');
      }
    })();
  }, []);

  const [cancelTarget, setCancelTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const list = activeTab === 'apply' ? applyList : historyList;

  const handleOpenCancelModal = (id: string) => {
    const item = applyList.find((x) => x.id === id);
    if (!item) return;
    setCancelTarget({ id, title: item.title });
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) {
      showToast('봉사 취소에 실패했습니다.');
      return;
    }
    const res = await axiosAuth.post(`/posts/${cancelTarget.id}/reject`);
    if (res.data?.error) {
      showToast('봉사 취소에 실패했습니다.');
      return;
    }

    showToast('취소가 완료되었습니다.');

    if (!cancelTarget) return;
    setApplyList((prev) => prev.filter((x) => x.id !== cancelTarget.id));
    setCancelTarget(null);
  };

  return (
    <main className='bg-page-gradient flex flex-col items-center gap-4 pb-10'>
      <TopBar title='나의 봉사 활동' bgColor='bg-page-background' />

      <TabButton activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'history' && (
        <VolunProfile volunHour={totalHour}></VolunProfile>
      )}

      <section className='items-center justify-center space-y-4'>
        {list.map((item) => {
          return (
            <ReviewListCard
              key={item.id}
              id={item.id}
              mode={activeTab}
              category={item.category}
              title={item.title}
              date={item.date}
              location={item.place}
              image={item.image ?? '/icons/ic_senior.svg'}
              approve={item.approve}
              cta={
                activeTab === 'apply'
                  ? item.approve === '승인 완료' || item.approve === '승인 반려'
                    ? undefined
                    : {
                        label: '신청 취소',
                        color: 'red',
                        onClick: () => handleOpenCancelModal(item.id),
                      }
                  : item.reviewed === 'false'
                    ? {
                        label: '리뷰 작성',
                        color: 'green',
                        onClick: (id) => router.push(`/review/write/${id}`),
                      }
                    : undefined
              }
            />
          );
        })}
      </section>

      {activeTab === 'apply' && cancelTarget && (
        <Modal
          title={cancelTarget.title}
          description='해당 봉사를 취소하시겠습니까?'
          onCancel={() => setCancelTarget(null)}
          onConfirm={handleConfirmCancel}
          cancelText='아니오'
          confirmText='네'
          confirmColor='pink'
        />
      )}
    </main>
  );
}
