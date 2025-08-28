'use client';

import Button from '@/components/atoms/Button';

interface SubmitButtonProps {
  label?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function BottomButton({
  label = '작성 완료',
  onClick,
  type = 'button', // 기본값
}: SubmitButtonProps) {
  return (
    <div className='bg-white px-[26px] py-3 shadow-[0_0_5px_0_rgba(0,0,0,0.15)]'>
      <Button type={type} onClick={onClick} className='w-full'>
        {label}
      </Button>
    </div>
  );
}
