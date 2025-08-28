'use client';

import Image from 'next/image';
import { KeyboardEvent } from 'react';

type StarRatingProps = {
  value: number; // 현재 값 (1..max, 0 허용)
  onChange?: (v: number) => void; // 값 변경 핸들러
  max?: number; // 기본 5
  size?: number; // 픽셀, 기본 40
  className?: string;
  readOnly?: boolean;
  label?: string; // 스크린리더용 라벨
};

export default function StarRating({
  value,
  onChange,
  max = 5,
  size = 40,
  className = '',
  readOnly = false,
  label = '별점 선택',
}: StarRatingProps) {
  const setValue = (v: number) => {
    if (readOnly || !onChange) return;
    onChange(v);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onChange(Math.min(max, (value || 0) + 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(Math.max(0, (value || 0) - 1));
    }
  };

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role='radiogroup'
      aria-label={label}
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={onKeyDown}
    >
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const filled = n <= value;
        return (
          <button
            key={n}
            type='button'
            role='radio'
            aria-checked={filled && value === n}
            aria-label={`${n}점`}
            disabled={readOnly}
            onClick={() => setValue(n)}
            className='focus:outline-none'
          >
            <Image
              src={
                filled
                  ? '/icons/ic_star_filled.svg'
                  : '/icons/ic_star_outline.svg'
              }
              alt=''
              width={size}
              height={size}
              priority={false}
            />
          </button>
        );
      })}
    </div>
  );
}
