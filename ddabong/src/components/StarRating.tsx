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

        const getStarSrc = (starIndex: number) => {
          if (value >= starIndex + 1) {
            return '/icons/ic_star_filled.svg';
          }

          const fraction = value - starIndex;
          if (fraction > 0.75) return '/icons/ic_star_almost.svg';
          if (fraction > 0.35) return '/icons/ic_star_half.svg';
          if (fraction > 0) return '/icons/ic_star_quarter.svg';

          return '/icons/ic_star_outline.svg';
        };

        return (
          <div key={id} className='inline-block'>
            <input
              id={id}
              type='radio'
              name={name}
              value={n}
              checked={checked}
              onChange={() => onChange?.(n)}
              required={required && i === 0}
              className='sr-only'
            />
            <label htmlFor={id} className='cursor-pointer select-none'>
              <Image
                src={getStarSrc(i)}
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
