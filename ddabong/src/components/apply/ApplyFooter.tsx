'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from '../atoms/Button';
import Modal from '../atoms/modal';

type ApplyFooterProps = {
  isApply: boolean;
  postTitle: string;
  isLiked?: boolean;
  hasApplied?: boolean;
  isApplying?: boolean;
  onLike: () => void;
  onApply: () => void;
};

export default function ApplyFooter({
  isApply,
  postTitle,
  isLiked = false,
  hasApplied = false,
  isApplying = false,
  onLike,
  onApply,
}: ApplyFooterProps) {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);
  const handleConfirmApply = () => {
    onApply();
    closeModal();
  };

  // This component is only for the user-facing apply page now.
  // The admin-related logic (edit/delete) is removed for clarity.
  if (!isApply) {
    return null;
  }

  const getButtonText = () => {
    if (hasApplied) return '신청 완료';
    if (isApplying) return '신청 중...';
    return '신청하기';
  };

  return (
    <>
      <section
        className={`relative flex h-[68px] items-center justify-center gap-32`}
      >
        <button
          type='button'
          onClick={onLike}
          aria-pressed={isLiked}
          aria-label={isLiked ? '좋아요 취소' : '좋아요'}
        >
          <span className='relative inline-block h-[30px] w-[30px]'>
            <Image
              src={
                isLiked
                  ? '/icons/ic_heart_filled.svg'
                  : '/icons/ic_heart_outline.svg'
              }
              alt='Heart Icon'
              fill
              className='object-contain'
            />
          </span>
        </button>

        <Button
          className={`bg-Logo-Mint h-[45px] w-[145px]`}
          onClick={openModal}
          disabled={hasApplied || isApplying}
        >
          {getButtonText()}
        </Button>
      </section>
      {isModalOpened && (
        <Modal
          title={postTitle}
          description={'해당 봉사활동을 신청하시겠습니까?'}
          onCancel={closeModal}
          onConfirm={handleConfirmApply}
          confirmText={'신청'}
          confirmColor={'green'}
        />
      )}
    </>
  );
}
