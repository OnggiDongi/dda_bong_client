'use client';

import Image from 'next/image';

type StarRatingProps = {
  value: number;
  onChange?: (v: number) => void;
  max?: number;
  size?: number;
  className?: string;
  readOnly?: boolean;
  label?: string;
  /** 폼 검증용: 같은 그룹으로 묶을 이름 */
  name?: string;
  /** 폼 검증용: 선택 강제 */
  required?: boolean;
};

export default function StarRating({
  value,
  onChange,
  max = 5,
  size = 40,
  className = '',
  readOnly = false,
  label = '별점 선택',
  name = 'rating',
  required = false,
}: StarRatingProps) {
  return (
    <fieldset
      className={`flex items-center gap-2 ${className}`}
      aria-label={label}
      disabled={readOnly}
    >
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const checked = value === n;
        const id = `${name}-${n}`;
        return (
          <div key={id} className='inline-block'>
            <input
              id={id}
              type='radio'
              name={name}
              value={n}
              checked={checked}
              onChange={() => onChange?.(n)}
              // 그룹에 하나만 required를 건다(첫 번째에만)
              required={required && i === 0}
              className='sr-only'
            />
            <label htmlFor={id} className='cursor-pointer select-none'>
              <Image
                src={
                  n <= value
                    ? '/icons/ic_star_filled.svg'
                    : '/icons/ic_star_outline.svg'
                }
                alt={`${n}점`}
                width={size}
                height={size}
                priority={false}
              />
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
