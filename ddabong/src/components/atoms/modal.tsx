'use client';

import { useRef, type MouseEventHandler } from 'react';
import Button from './Button';
import Txt from './Text';

type Props = {
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function Modal({
  title,
  description,
  onCancel,
  onConfirm,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const onClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlayRef.current) onCancel();
  };

  return (
    <div
      ref={overlayRef}
      onClick={onClickOverlay}
      className='fixed inset-0 z-[100] flex w-full items-center justify-center bg-[#3E3A39B2]'
    >
      <div className='h-65 w-[370px] rounded-[20px] bg-white pt-13 text-center'>
        <Txt weight='bold' className='text-2xl'>
          {title}
        </Txt>
        {description && (
          <Txt weight='semibold' className='text-Modal-font block pt-6 text-xl'>
            {description}
          </Txt>
        )}
        <div className='flex justify-center gap-5 pt-11'>
          <Button
            color='gray'
            className='bg-Page-Background h-[45px] w-[155px] rounded-xl py-2.5'
            onClick={onCancel}
            textClassName='text-Icon-Detail'
          >
            취소
          </Button>

          <Button
            color='green'
            className='h-[45px] w-[155px] rounded-xl py-2.5'
            onClick={onConfirm}
          >
            신청
          </Button>
        </div>
      </div>
    </div>
  );
}
