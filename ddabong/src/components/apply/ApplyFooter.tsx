'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';

type ApplyFooterProps = {
  isApply: boolean;
};

export default function ApplyFooter({ isApply = true }: ApplyFooterProps) {
  const [liked, setLiked] = useState(false);

  const applyDelete = async () => {
    try {
      if (isApply) {
        // 신청로직
        alert('신청되었습니다.');
      } else {
        // 삭제로직
        alert('삭제되었습니다.');
      }
    } catch (error) {
      console.error('Error during apply/delete:', error);
    }
  };

  useEffect(() => {
    // 좋아요에 따른 api 전송
  }, [liked]);

  return (
    <section
      className={`relative flex h-[68px] items-center justify-center shadow-[0_0_5px_0_rgba(0,0,0,0.15)] ${isApply ? 'gap-32' : 'gap-10'}`}
    >
      {isApply ? (
        <button
          type='button'
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? '좋아요 취소' : '좋아요'}
          className=''
        >
          <span className='relative inline-block h-[30px] w-[30px]'>
            <Image
              src={
                liked
                  ? '/icons/ic_heart_filled.svg'
                  : '/icons/ic_heart_outline.svg'
              }
              alt=''
              fill
              className='object-contain'
            />
          </span>
        </button>
      ) : (
        <Button
          className='bg-Background h-[45px] w-[145px]'
          textClassName='text-Hana-Black/60'
          onClick={() => alert('수정하기')}
        >
          수정하기
        </Button>
      )}

      <Button
        className={`h-[45px] w-[145px] ${
          isApply ? 'bg-Logo-Mint' : 'bg-Logo-Pink'
        }`}
        onClick={applyDelete}
      >
        {isApply ? '신청하기' : '삭제하기'}
      </Button>
    </section>
  );
}
