// components/volunteer/ActivityCard.tsx
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

// components/volunteer/ActivityCard.tsx

// components/volunteer/ActivityCard.tsx

// components/volunteer/ActivityCard.tsx

// components/volunteer/ActivityCard.tsx

export type Approve = '승인 대기' | '승인 반려' | '승인 완료' | '승인 대기 중';
export type ActivityItem = {
  image: string | undefined;
  location: string;
  id: string;
  title: string;
  date: string; // YYYY.MM.DD
  place: string;
  category: string;
  approve?: Approve; // 지난내역에는 없을 수도 있으니 선택
  thumbnail?: string;
};

function toneByApprove(a?: Approve) {
  if (!a) return { bg: '#E7EEF3', text: '#6E7C87' };
  if (a.includes('대기')) return { bg: '#EEF2F7', text: '#56708C' };
  if (a.includes('반려')) return { bg: '#FFE8EA', text: '#E64B5E' };
  if (a.includes('완료')) return { bg: '#E6F7EF', text: '#2AA36B' };
  return { bg: '#E7EEF3', text: '#6E7C87' };
}

export default function ActivityCard({
  item,
  cta,
}: {
  item: ActivityItem;
  cta?: {
    label: string;
    onClick: (id: string) => void;
    tone?: 'danger' | 'primary' | 'muted';
  };
}) {
  const approveTone = toneByApprove(item.approve);
  return (
    <article className='rounded-2xl border border-[#E4EDED] bg-white p-4 shadow-sm'>
      <div className='flex gap-3'>
        <div className='relative h-[84px] w-[112px] overflow-hidden rounded-xl bg-gray-100'>
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt=''
              fill
              sizes='112px'
              className='object-cover'
            />
          ) : null}
        </div>

        <div className='min-w-0 flex-1'>
          <div className='mb-1 flex flex-wrap gap-2'>
            <span
              className='inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold'
              style={{ backgroundColor: '#10AB9F1A', color: '#10AB9F' }}
            >
              {item.category}
            </span>

            {item.approve && (
              <span
                className='inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold'
                style={{
                  backgroundColor: approveTone.bg,
                  color: approveTone.text,
                }}
              >
                {item.approve}
              </span>
            )}
          </div>

          <h3 className='truncate text-[17px] font-semibold text-[#2E2E2E]'>
            {item.title}
          </h3>

          <p className='mt-1 text-[13px] text-[#7A8B8A]'>{item.date}</p>
          <p className='text-[13px] text-[#7A8B8A]'>{item.place}</p>
        </div>
      </div>

      {cta && (
        <>
          <hr className='my-3 border-t border-[#EAEFF0]' />
          <button
            type='button'
            onClick={() => cta.onClick(item.id)}
            className={cn(
              'w-full text-center text-[18px] font-semibold',
              cta.tone === 'danger'
                ? 'text-[#E64B5E]'
                : cta.tone === 'muted'
                  ? 'text-[#6E7C87]'
                  : 'text-[#10AB9F]'
            )}
          >
            {cta.label}
          </button>
        </>
      )}
    </article>
  );
}
