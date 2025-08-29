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
          // 5단계 별점 표시를 위한 임계값
          const THRESHOLD_1_OUTLINE = 0.15;
          const THRESHOLD_2_QUARTER = 0.4;
          const THRESHOLD_3_HALF = 0.6;
          const THRESHOLD_4_ALMOST = 0.85;

          // 현재 별이 완전히 채워지는 경우
          if (value >= starIndex + 1) {
            return '/icons/ic_star_filled.svg';
          }

          // 소수점 값 계산
          const fraction = value - starIndex;

          // 소수점 구간에 따라 아이콘 결정 (가장 높은 값부터 체크)
          if (fraction >= THRESHOLD_4_ALMOST) {
            return '/icons/ic_star_filled.svg'; // 0.85 이상
          }
          if (fraction > THRESHOLD_3_HALF) {
            return '/icons/ic_star_almost.svg'; // 0.6 초과 ~ 0.85 미만
          }
          if (fraction >= THRESHOLD_2_QUARTER) {
            return '/icons/ic_star_half.svg'; // 0.4 이상 ~ 0.6 이하
          }
          if (fraction > THRESHOLD_1_OUTLINE) {
            return '/icons/ic_star_quarter.svg'; // 0.15 초과 ~ 0.4 미만
          }

          // 0.15 이하 및 그 외의 경우는 outline
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
