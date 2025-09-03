'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Txt from '@/components/atoms/Text';

type Props = {
  userName: string;
  imageUrl: string;
  rate: number;
  content: string;
};

export default function ReviewBox({
  userName,
  imageUrl,
  rate,
  content,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 일단 접힌 상태에서 측정
    el.classList.add('clamp-3');
    // 렌더 후 측정 보정
    requestAnimationFrame(() => {
      setShowToggle(el.scrollHeight > el.clientHeight + 1);
    });
    // cleanup (펼친 상태에서 다시 들어오면 초기화)
    return () => el.classList.remove('clamp-3');
  }, [content]);

  return (
    <>
      <div className='border-Box-Line relative flex flex-col justify-center border-b bg-white py-3'>
        <div className='flex'>
          <Image
            src={imageUrl}
            alt='user_profile_url'
            width={48}
            height={48}
            className='h-[48px] w-[48px] rounded-3xl object-cover'
          />
          <div className='flex-col pl-3'>
            <Txt className='text-lg'>{userName}</Txt>
            <div className='mb-1 flex'>
              <Image
                src='/icons/ic_ddabong.svg'
                alt='ic_ddabong'
                width={13}
                height={13}
                className='mr-1'
              />
              <Txt className='text-base'>{rate.toFixed(1)}</Txt>
            </div>
            <div className='space-y-1'>
              <div
                ref={ref}
                className={clsx(
                  'text-lg break-words whitespace-pre-line transition-all',
                  !expanded && 'clamp-3'
                )}
              >
                <Txt>{content}</Txt>
              </div>

              {showToggle && (
                <button
                  type='button'
                  className='text-Hana-Green text-sm underline'
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? '접기' : '더보기'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
