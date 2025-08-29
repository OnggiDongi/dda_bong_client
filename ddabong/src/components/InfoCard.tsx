'use client';

import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import Txt from '@/components/atoms/Text';

type InfoItem = { label: string; value: string };

interface InfoCardProps {
  items: InfoItem[];
  href: string; // 카드 전체를 감쌀 링크
  className?: string;
}

export default function InfoCard({ items, href, className }: InfoCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'block rounded-[16px] border bg-white p-5 shadow-[0_0px_5px_rgba(0,0,0,0.15)] transition hover:opacity-90',
        className
      )}
    >
      {items.map((it, i) => (
        <Row key={i} label={it.label} value={it.value} />
      ))}
    </Link>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-center justify-between py-1'>
      <Txt weight='extrabold' className='text-Hana-Black text-[22px]'>
        {label}
      </Txt>
      <Txt weight='semibold' className='text-Hana-Black text-[22px]'>
        {value}
      </Txt>
    </div>
  );
}
