'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { toPng } from 'html-to-image';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import Txt from '@/components/atoms/Text';
import Button from '../atoms/Button';
import { getCertificateStyle } from './CertificateCard';

const ICON_SRC = '/icons/ic_logoStar.svg';
const HANA_SRC = '/icons/ic_hanabank.svg';
const LOGO_SRC = '/icons/ic_logo.svg';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  userName: string;
  date: string;
  totalHours: number;
};

export default function CertificateModal({
  open,
  onClose,
  userName,
  date,
  totalHours,
}: ModalProps) {
  const { showToast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const { bgColor, borderColor } = getCertificateStyle(totalHours);

  const handleSave = async () => {
    if (cardRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current!, { cacheBust: true });
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = dataUrl;
      link.click();
      showToast('저장이 완료되었습니다.', 'success');
    } catch {
      showToast('저장에 실패했습니다.', 'error');
    }
  };

  const handleShare = async () => {
    if (cardRef.current === null) {
      return;
    }
    try {
      const dataUrl = await toPng(cardRef.current!, { cacheBust: true });
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      showToast('인증서가 클립보드에 복사되었습니다.', 'success');
    } catch {
      showToast('이미지 복사에 실패했습니다.', 'error');
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[#3E3A39B2]'
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div
          ref={cardRef}
          className={cn(
            bgColor,
            borderColor,
            'relative flex h-[450px] w-[300px] flex-col items-center rounded-2xl border-2 px-7 pt-8 text-center'
          )}
        >
          <button
            onClick={onClose}
            aria-label='닫기'
            className='absolute -top-45 -right-6 rounded-full p-1 hover:opacity-90'
          >
            <Image
              src='/icons/ic_close_white.svg'
              alt='닫기'
              width={20}
              height={20}
            />
          </button>
          <Image
            src={HANA_SRC}
            alt='하나은행 로고'
            width={30}
            height={30}
            className='absolute top-5 right-5'
          />

          <Image
            src={ICON_SRC}
            alt='인증서 별돌이'
            width={210}
            height={210}
            className='pt-5'
          />

          <Txt className='pt-2 text-2xl'>{userName}</Txt>
          <Txt className='text-Icon-Detail pt-0.5 text-lg'>{date}</Txt>

          <Txt weight='bold' className='text-Logo-Mint mt-3 text-2xl'>
            봉사 {totalHours}시간 달성 !
          </Txt>
          <div className='flex items-center justify-center pt-4'>
            <Image src={LOGO_SRC} alt='따봉 로고' width={40} height={40} />
            <Txt className='text-Logo-Pink text-base'>이 함께 축하해요</Txt>
          </div>
        </div>

        <div className='flex items-center justify-center gap-3 pt-6'>
          <Button
            color='gray'
            className='h-[45px] w-[140px]'
            textClassName='text-Modal-font'
            onClick={handleShare}
          >
            공유하기
          </Button>
          <Button
            color='gray'
            className='h-[45px] w-[140px]'
            textClassName='text-Modal-font'
            onClick={handleSave}
          >
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
}
