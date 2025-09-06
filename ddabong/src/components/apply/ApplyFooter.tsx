'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from '../atoms/Button';
import Txt from '../atoms/Text';
import Modal from '../atoms/modal';

type ApplyFooterProps = {
  isApply: boolean;
  postTitle?: string;
  dday?: string;
  isLiked?: boolean;
  hasApplied?: boolean;
  isApplying?: boolean;
  onLike?: () => void;
  onApply?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

export default function ApplyFooter({
  isApply,
  postTitle,
  dday,
  isLiked = false,
  hasApplied = false,
  isApplying = false,
  onLike,
  onApply,
  onDelete,
  onEdit,
}: ApplyFooterProps) {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);
  const handleConfirmApply = () => {
    onApply?.();
    closeModal();
  };

  if (!isApply) {
    return (
      <section className='relative flex h-[68px] items-center justify-center gap-4'>
        <Button
          className='h-[45px] w-[145px] bg-gray-400'
          onClick={onEdit}
        >
          수정하기
        </Button>
        <Button
          className='h-[45px] w-[145px] bg-red-500'
          onClick={onDelete}
        >
          삭제하기
        </Button>
      </section>
    );
  }

  const isRecruitmentClosed = () => {
    if (dday === 'D-DAY' || dday === 'D-0') {
      return false;
    }
    if (dday?.startsWith('D-')) {
      return false;
    }
    return true;
  };

  const recruitmentClosed = isRecruitmentClosed();

  const getButtonText = () => {
    if (recruitmentClosed) return '모집 마감';
    if (hasApplied) return '신청 완료';
    if (isApplying) return '신청 중...';
    return '신청하기';
  };

  return (
    <>
      <section
        className={`relative flex h-[68px] items-center justify-center shadow-[0_0_5px_0_rgba(0,0,0,0.15)] ${recruitmentClosed ? '' : 'gap-32'}`}
      >
        {!recruitmentClosed && (
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
        )}

        {recruitmentClosed ? (
          <div className='flex h-[70%] w-[85%] items-center justify-center rounded-lg bg-[#EBEDF1]'>
            <Txt className='text-Modal-font text-xl'>
              모집이 마감되었습니다.
            </Txt>
          </div>
        ) : (
          <Button
            className={`h-[45px] w-[145px] ${hasApplied ? 'bg-Modal-font' : 'bg-Logo-Mint'}`}
            onClick={openModal}
            disabled={hasApplied || isApplying || recruitmentClosed}
          >
            {getButtonText()}
          </Button>
        )}
      </section>
      {isModalOpened && (
        <Modal
          title={postTitle || ''}
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
