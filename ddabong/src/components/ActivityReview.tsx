'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '../contexts/toast/ToastContext';
import ReviewRating from './ReviewRating';
import AiComment from './atoms/AiComment';
import Badge from './atoms/Badge';
import Button from './atoms/Button';
import Txt from './atoms/Text';
import Modal from './atoms/modal';

type Props = {
  userName: string;
  imageUrl: string;
  status: string;
  totalRate: number | null;
  diligenceLevel: number | null;
  healthStatus: number | null;
  attitude: number | null;
  aiReview: string | null;
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
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [modalType, setModalType] = useState<'APPROVE' | 'REJECT' | null>(null); // 어떤 버튼 눌렀는지
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
      showToast('수락이 완료되었습니다.', 'success');
      // ✅ 수락 처리
      console.log('수락!');
    } else {
      showToast('거절이 완료되었습니다.', 'success');
      // ✅ 거절 처리
      console.log('거절!');
    }
    closeModal();
  };
  return (
    <>
      <div className='mt-1 flex flex-col items-center bg-white'>
        {/* w-full 로 폭 고정 + padding 적용이 보이도록 */}
        <div className='mt-5 mb-2 flex w-full px-6'>
          <Image
            src={imageUrl}
            alt='user_profile_url'
            width={48}
            height={48}
            className='h-[48px] w-[48px] flex-shrink-0 rounded-3xl object-cover'
          />

          {/* 오른쪽 컬럼이 줄어들 수 있게 min-w-0 + 필요시 overflow-hidden */}
          <div className='min-w-0 flex-1 pl-3'>
            {/* 이 줄이 좌우로 벌어지며 넘칠 수 있으니 */}
            <div className='flex items-start justify-between gap-2'>
              {/* 이름은 길어질 수 있어 truncate 옵션 */}
              <Txt className='truncate text-lg'>{userName}</Txt>

              {status === 'PENDING' ? (
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
              ) : status === 'APPROVED' ? (
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
              ) : (
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
              )}
            </div>

            {/* 내부 컴포넌트가 넓을 수 있으니 한 번 더 min-w-0/overflow-hidden 가드 */}
            <div className='min-w-0 overflow-hidden'>
              <ReviewRating
                totalRate={totalRate}
                diligenceLevel={diligenceLevel}
                attitude={attitude}
                healthStatus={healthStatus}
              />
              {aiReview ? (
                // 고정폭 w-80 대신 컨테이너 기준으로: w-full + max-w
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
      {isModalOpen && (
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
