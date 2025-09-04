'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '../contexts/toast/ToastContext';
import ReviewRating from './ReviewRating';
import AiComment from './atoms/AiComment';
import Badge from './atoms/Badge';
import Button from './atoms/Button';
import Txt from './atoms/Text';
import Modal from './atoms/modal';

type Mode = 'moderation' | 'evaluation';

type Props = {
  userName: string;
  imageUrl: string;
  status: string;
  totalRate: number | null;
  diligenceLevel: number | null;
  healthStatus: number | null;
  attitude: number | null;
  aiReview: string | null;
  mode?: Mode;
  evaluateHref?: string;
  /* 현재 로그인한 평가자가 이 봉사자에 대해 이미 평가했는지 */
  hasMyReview?: boolean; // default: false
};

export default function ActivityReview({
  userName,
  imageUrl,
  status,
  totalRate,
  diligenceLevel,
  healthStatus,
  attitude,
  aiReview,
  mode = 'evaluation',
  evaluateHref,
  hasMyReview = false,
}: Props) {

  const router = useRouter();

  // 승인/거절 모드에서만 사용
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'APPROVE' | 'REJECT' | null>(null);
  const { showToast } = useToast();

  const openModal = (type: 'APPROVE' | 'REJECT') => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };
  const handleConfirm = () => {
    if (modalType === 'APPROVE') {
      showToast('수락이 완료되었습니다.');
      // 수락 처리
      console.log('수락!');
    } else {
      showToast('거절이 완료되었습니다.');
      // 거절 처리
      console.log('거절!');
    }
    closeModal();
  };

  // 평가 버튼 렌더링
  const renderEvaluateButton = () => {
    const isReviewedByMe = hasMyReview ?? false; // 기본값 false

    const btnClasses =
      'h-auto w-auto' +
      (isReviewedByMe ? ' pointer-events-none cursor-default' : '');

    const badgeClasses = 'px-4' + (isReviewedByMe ? ' opacity-70' : '');

    return (
      <div className='flex flex-wrap gap-2'>
        <Button
          color='white'
          className={btnClasses}
          textClassName='leading-none flex items-center'
          aria-disabled={isReviewedByMe}
          tabIndex={isReviewedByMe ? -1 : 0}
          onClick={() => {
            if (!isReviewedByMe && evaluateHref) router.push(evaluateHref);
          }}
        >
          <Badge
            text={isReviewedByMe ? '평가완료' : '평가하기'}
            bgColor={isReviewedByMe ? 'bg-Box-Line' : 'bg-Logo-Pink'}
            borderColor={isReviewedByMe ? undefined : 'border-Logo-Pink'}
            textClassName={isReviewedByMe ? 'text-Hana-Black' : 'text-white'}
            className={badgeClasses}
          />
        </Button>
      </div>
    );
  };

  // 승인/거절
  const renderModerationButtons = () => {
    if (status === 'PENDING') {
      return (
        <div className='flex flex-wrap gap-2'>
          <Button
            color='white'
            className='h-auto w-auto'
            textClassName='leading-none flex items-center'
            onClick={() => openModal('REJECT')}
          >
            <Badge
              text='거절'
              bgColor='white'
              borderColor='border-Logo-Pink'
              textClassName='text-Logo-Pink'
              className='px-4'
            />
          </Button>
          <Button
            color='white'
            className='h-auto w-auto'
            textClassName='leading-none flex items-center'
            onClick={() => openModal('APPROVE')}
          >
            <Badge
              text='수락'
              bgColor='white'
              borderColor='border-Logo-Mint'
              textClassName='text-Logo-Mint'
              className='px-4'
            />
          </Button>
        </div>
      );
    }
    if (status === 'APPROVED') {
      return (
        <div className='flex flex-wrap gap-2'>
          <Badge
            text='거절'
            bgColor='white'
            textClassName='text-white'
            className='px-4 py-0.5'
          />
          <Badge
            text='수락'
            bgColor='bg-Logo-Mint'
            borderColor='border-Logo-Mint'
            textClassName='text-white'
            className='px-4 py-0.5'
          />
        </div>
      );
    }
    return (
      <div className='flex flex-wrap gap-2'>
        <Badge
          text='거절'
          bgColor='white'
          textClassName='text-white'
          className='px-4 py-0.5'
        />
        <Badge
          text='거절'
          bgColor='bg-Logo-Pink'
          textClassName='text-white'
          className='px-4 py-0.5'
        />
      </div>
    );
  };

  return (
    <>
      <div className='mt-1 flex flex-col items-center bg-white'>
        <div className='mt-5 mb-2 flex w-full px-6'>
          <Image
            src={imageUrl}
            alt='user_profile_url'
            width={48}
            height={48}
            className='h-[48px] w-[48px] flex-shrink-0 rounded-3xl object-cover'
          />

          <div className='min-w-0 flex-1 pl-3'>
            <div className='flex items-start justify-between gap-2'>
              <Txt className='truncate text-lg'>{userName}</Txt>

              {/* 모드에 따라 다른 액션 버튼 */}
              {mode === 'evaluation'
                ? renderEvaluateButton()
                : renderModerationButtons()}
            </div>

            <div className='min-w-0 overflow-hidden'>
              <ReviewRating
                totalRate={totalRate}
                diligenceLevel={diligenceLevel}
                attitude={attitude}
                healthStatus={healthStatus}
              />
              {aiReview ? (
                <AiComment
                  text={aiReview}
                  className='mb-3 w-full break-words'
                />
              ) : (
                <div className='mb-3 w-full'></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 승인/거절 모달은 moderation 모드일 때만 의미 있음 */}
      {mode === 'moderation' && isModalOpen && (
        <Modal
          title={userName}
          description={
            modalType === 'APPROVE'
              ? '해당 봉사자를 수락하시겠습니까?'
              : '해당 봉사자를 거절하시겠습니까?'
          }
          onCancel={closeModal}
          onConfirm={handleConfirm}
          cancelText='취소'
          confirmText={modalType === 'APPROVE' ? '수락' : '거절'}
          confirmColor={modalType === 'APPROVE' ? 'green' : 'pink'}
        />
      )}
    </>
  );
}
