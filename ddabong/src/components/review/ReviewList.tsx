'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';

export type ReviewCardMode = 'apply' | 'history';
export type Approve = '승인 대기' | '승인 반려' | '승인 완료' | '승인 대기 중';

type CTA = {
  label: string;
  color?: 'green' | 'red';
  onClick: (id: string | number) => void;
};

type Props = {
  id: string | number;
  mode: ReviewCardMode;
  category: string;
  title: string;
  date: string;
  location: string;
  image: string;
  approve?: Approve;
  href?: string;
  cta?: CTA;
  className?: string;
};

const toneToClass: Record<NonNullable<CTA['color']>, string> = {
  green: 'text-Logo-Mint',
  red: 'text-Logo-Pink',
};

export default function ReviewListCard({
  id,
  mode,
  category,
  title,
  date,
  location,
  image,
  approve,
  href,
  cta,
  className,
}: Props) {
  const link: string | undefined =
    href ?? (mode === 'apply' ? `/apply/${id}` : undefined);

  const approveBadge =
    mode === 'apply' && approve
      ? {
          text: approve,
          bgColor: approve.includes('반려')
            ? 'bg-Logo-Pink'
            : approve.includes('완료')
              ? 'bg-Logo-Mint'
              : 'bg-white',
          textColor: approve.includes('대기')
            ? 'text-Modal-font'
            : 'text-white',
          borderColor: approve.includes('대기') ? 'border-Modal-font' : '',
        }
      : null;

  const Body = (
    <div className='flex gap-3'>
      <Image
        src={image}
        alt={title}
        width={120}
        height={120}
        className='h-[120px] w-[120px] rounded-xl object-cover'
      />

      <div className='flex flex-col justify-between pl-1'>
        <div className='flex gap-1'>
          <Badge text={category} />
          {approveBadge && (
            <Badge
              text={approveBadge.text}
              bgColor={approveBadge.bgColor}
              textColor={approveBadge.textColor}
              borderColor={approveBadge.borderColor}
            />
          )}
        </div>

        <Txt weight='semibold' className='w-[190px] truncate text-lg'>
          {title}
        </Txt>

        <Txt className='text-Icon-Detail -mt-1 text-base'>{date}</Txt>
        <Txt className='text-Icon-Detail -mt-2 text-base'>{location}</Txt>
      </div>
    </div>
  );

  return (
    <div className={cn('block', className)}>
      <div className='flex w-[350px] flex-col gap-3 rounded-2xl bg-white p-4'>
        {link ? <Link href={link}>{Body}</Link> : Body}

        {cta && (
          <>
            <hr className='border-icon-detail' />
            <button
              type='button'
              className={cn(
                'w-full text-center text-xl font-semibold',
                toneToClass[cta.color ?? 'green']
              )}
              onClick={() => {
                cta.onClick(id);
              }}
            >
              {cta.label}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
