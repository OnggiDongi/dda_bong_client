'use client';

import Image from 'next/image';
import { useState } from 'react';
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
  totalRate: number;
  diligenceLevel: number;
  healthStatus: number;
  attitude: number;
  aiReview: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 추가
  const [modalType, setModalType] = useState<'APPROVE' | 'REJECT' | null>(null); // 어떤 버튼 눌렀는지

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
      // ✅ 수락 처리
      console.log('수락!');
    } else {
      // ✅ 거절 처리
      console.log('거절!');
    }
    closeModal();
  };
  return (
    <>
      <div className='mt-1 flex flex-col items-center bg-white'>
        <div className='mt-5 mb-2 flex'>
          <Image
            src={imageUrl}
            alt='user_profile_url'
            width={48}
            height={48}
            className='h-[48px] w-[48px] rounded-3xl object-cover'
          />
          <div className='flex-1 pl-3'>
            <div className='flex justify-between'>
              <Txt className='text-lg'>{userName}</Txt>
              {status == 'PENDING' ? (
                <div>
                  <Button
                    color='white'
                    className='ml-2 h-auto w-auto'
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
                  </Button>{' '}
                  <Button
                    color='white'
                    className='ml-2 h-auto w-auto'
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
              ) : status == 'APPROVED' ? (
                <div>
                  <Badge
                    text='거절'
                    bgColor='white'
                    textClassName='text-white'
                    className='px-4 py-0.5'
                  />{' '}
                  <Badge
                    text='수락'
                    bgColor='bg-Logo-Mint'
                    borderColor='border-Logo-Mint'
                    textClassName='text-white'
                    className='px-4 py-0.5'
                  />
                </div>
              ) : (
                <div>
                  <Badge
                    text='거절'
                    bgColor='white'
                    textClassName='text-white'
                    className='px-4 py-0.5'
                  />{' '}
                  <Badge
                    text='거절'
                    bgColor='bg-Logo-Pink'
                    textClassName='text-white'
                    className='px-4 py-0.5'
                  />
                </div>
              )}
            </div>
            <ReviewRating
              totalRate={totalRate}
              diligenceLevel={diligenceLevel}
              attitude={attitude}
              healthStatus={healthStatus}
            />
            <AiComment text={aiReview} className='mb-3 w-80' />
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
