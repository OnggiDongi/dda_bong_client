'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Preview } from './useUserForm';

export const DEFAULT_IMG = '/images/defaultSenior.png';

export function AvatarPicker({
  avatar,
  fallback,
  onPick,
}: {
  avatar: Preview | null;
  fallback: string; // user.profileImage
  onPick: (file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const safeFallback =
    fallback && fallback.trim().length > 0 ? fallback : DEFAULT_IMG;

  const src = avatar?.url ?? safeFallback;

  return (
    <div className='relative h-[120px] w-[120px]'>
      <Image
        src={src}
        alt='프로필'
        fill
        sizes='120px'
        className='rounded-full object-cover ring-1 ring-black/10'
        priority
      />
      <button
        type='button'
        onClick={() => fileRef.current?.click()}
        className='border-Box-Line absolute right-0 bottom-0 grid h-8 w-8 place-items-center rounded-full border bg-white'
        aria-label='프로필 이미지 변경'
      >
        <Image src='/icons/ic_edit.svg' alt='' width={16} height={16} />
      </button>
      <input
        ref={fileRef}
        type='file'
        accept='image/*'
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onPick(file);
          }
        }}
        className='hidden'
      />
    </div>
  );
}
