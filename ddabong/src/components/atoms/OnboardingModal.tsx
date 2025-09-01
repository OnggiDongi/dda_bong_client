'use client';

import { useEffect, useRef, useState, type MouseEventHandler } from 'react';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';
import Category from '../admin/register/Category';
import LocationSelect from '../apply/LocationSelect';

type OnboardingModalProps = {
  open: boolean;
  defaultRegion?: string;
  defaultInterest?: string;
  onClose: () => void;
  onSubmit: (payload: { region: string; interest: string }) => void;
};

export default function OnboardingModal({
  open,
  defaultRegion = '',
  defaultInterest = '',
  onClose,
  onSubmit,
}: OnboardingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState(defaultRegion);
  const [interest, setInterest] = useState(defaultInterest);

  const canSubmit = region !== '' && interest !== '';

  const onClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const [category, setCategory] = useState('');

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={onClickOverlay}
      className='fixed inset-0 z-[40] flex w-full items-center justify-center bg-[#3E3A39B2]'
      role='dialog'
      aria-modal='true'
      aria-labelledby='onboarding-modal-title'
    >
      <div className='relative w-[370px] rounded-[20px] bg-white p-6 pt-9'>
        <div className='text-center'>
          <Txt
            id='onboarding-modal-title'
            weight='bold'
            className='text-Hana-Black text-2xl leading-7'
          >
            <Txt weight='heavy' className='text-Logo-Mint'>
              봉사 선호 지역
            </Txt>
            과<br />
            <Txt weight='heavy' className='text-Logo-Mint'>
              관심 분야
            </Txt>
            를 선택해 주세요!
          </Txt>
        </div>
        {/* 폼 영역 */}
        <div className='mt-8 space-y-6'>
          <div>
            <Txt weight='bold' className='text-Hana-Black mb-2 block text-2xl'>
              봉사 선호 지역
            </Txt>
            <div className='[&_*]:text-2xl'>
              <LocationSelect />
            </div>
          </div>

          <div>
            <Txt weight='bold' className='text-Hana-Black mb-2 block text-2xl'>
              관심 분야
            </Txt>
            <div className='[&_*]:text-2xl'>
              <Category
                value={category}
                onValueChange={(value) => setCategory(value)}
              />
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className='mt-9 flex items-center justify-center gap-5'>
          <Button
            color='gray'
            className='bg-Page-Background h-[45px] w-[155px] rounded-xl py-2.5'
            onClick={onClose}
            textClassName='text-Icon-Detail'
          >
            나중에
          </Button>

          <Button
            color='green'
            className='h-[45px] w-[155px] rounded-xl py-2.5 disabled:opacity-40'
            onClick={() => onSubmit({ region, interest })}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
