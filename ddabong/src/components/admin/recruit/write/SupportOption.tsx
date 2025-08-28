'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import Txt from '@/components/atoms/Text';

function OptionCircle({
  label,
  img,
  selected,
  onClick,
}: {
  label: string;
  img: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex w-[110px] flex-col items-center gap-2 pt-1 focus:outline-none'
    >
      <div
        className={cn(
          'grid h-25 w-25 place-items-center rounded-full',
          selected
            ? 'bg-[var(--1Q-Blue,#E1EFF5)] shadow-[inset_4px_4px_6px_rgba(0,0,0,0.25)]'
            : 'bg-white'
        )}
      >
        <Image src={img} alt={label} width={70} height={70} />
      </div>

      <Txt className='text-base'>{label}</Txt>
    </button>
  );
}

export type SupportKey = 'bus' | 'plancard' | 'snack';

type Props = {
  value: Set<SupportKey>;
  onChange: (next: Set<SupportKey>) => void;
};

export default function SupportOption({ value, onChange }: Props) {
  const toggle = (key: SupportKey) => {
    const next = new Set(value);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    onChange(next);
  };

  return (
    <section className='pt-5 pb-20'>
      <Txt className='text-xl'>하나은행이 함께 준비해 드릴게요!</Txt>
      <br />
      <Txt className='text-Modal-font pt-1 text-xs'>※ 중복선택 가능</Txt>

      <div className='flex items-center justify-between gap-3 pt-2'>
        <OptionCircle
          label='버스 대절'
          img='/icons/ic_bus.svg'
          selected={value.has('bus')}
          onClick={() => toggle('bus')}
        />
        <OptionCircle
          label='플랜카드'
          img='/icons/ic_banner.svg'
          selected={value.has('plancard')}
          onClick={() => toggle('plancard')}
        />
        <OptionCircle
          label='다과'
          img='/icons/ic_snacks.svg'
          selected={value.has('snack')}
          onClick={() => toggle('snack')}
        />
      </div>

      <details className='mt-4'>
        <summary className='text-Modal-font inline-flex cursor-pointer items-center gap-1'>
          지원 카테고리 설명
          <Image
            src='/icons/ic_detail.svg'
            alt='자세히보기'
            width={15}
            height={10}
            className='pl-1'
          />
        </summary>

        <div className='mt-2 p-2'>
          <ul className='text-Icon-Detail list-inside list-disc space-y-4'>
            <li>
              <Txt weight='bold' className='text-Modal-font text-xs'>
                버스대절
              </Txt>
              <br />
              <Txt className='text-Modal-font text-xs'>
                봉사자가 30명 이상 모이면, 이동에 불편 없도록 하나은행에서 전용
                버스를 지원해 드립니다.
              </Txt>
            </li>
            <li>
              <Txt weight='bold' className='text-Modal-font text-xs'>
                플랜카드 제작
              </Txt>
              <br />
              <Txt className='text-Modal-font text-xs'>
                봉사의 특별한 순간을 기념할 수 있도록, 인증 사진에 활용 가능한
                맞춤형 플랜카드를 하나은행이 제작해 드립니다.
              </Txt>
            </li>
            <li>
              <Txt weight='bold' className='text-Modal-font text-xs'>
                다과 제공
              </Txt>
              <br />
              <Txt className='text-Modal-font text-xs'>
                함께하는 시간 동안 더 힘낼 수 있도록, 따뜻한 다과를 준비해
                드립니다.
              </Txt>
            </li>
          </ul>
        </div>
      </details>
    </section>
  );
}
