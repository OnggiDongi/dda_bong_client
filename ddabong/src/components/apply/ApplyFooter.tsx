'use client';

import { on } from 'events';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import Modal from '../atoms/modal';

type ApplyFooterProps = {
  isApply: boolean;
};

export default function ApplyFooter({ isApply = true }: ApplyFooterProps) {
  const [liked, setLiked] = useState(false);

  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const [isModify, setIsModify] = useState<boolean>(false);

  const openModal = (isModify: boolean) => {
    setIsModify(isModify);
    setModalOpened(true);
  };
  const closeModal = () => setModalOpened(false);

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
    <>
      <section
        className={`relative flex h-[68px] items-center justify-center ${isApply ? 'gap-32' : 'gap-10'}`}
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
            onClick={() => openModal(true)}
          >
            수정하기
          </Button>
        )}

        <Button
          className={`h-[45px] w-[145px] ${
            isApply ? 'bg-Logo-Mint' : 'bg-Logo-Pink'
          }`}
          onClick={() => openModal(false)}
        >
          {isApply ? '신청하기' : '삭제하기'}
        </Button>
      </section>

      {isModalOpened && (
        <Modal
          title='동해 바다 쓰레기 줍기'
          description={
            isApply
              ? '해당 봉사활동을 신청하시겠습니까?'
              : isModify
                ? '수정하시겠습니까?'
                : '삭제하시겠습니까?'
          }
          onCancel={closeModal}
          onConfirm={() => {
            applyDelete();
            closeModal();
          }}
          buttonTextLeft='취소'
          buttonTextRight={isApply ? '신청' : isModify ? '수정' : '삭제'}
        />
      )}
    </>
  );
}
