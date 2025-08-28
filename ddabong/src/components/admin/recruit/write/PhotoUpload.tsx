'use client';

import Image from 'next/image';
import Txt from '@/components/atoms/Text';

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
};

export default function PhotoUpload({ value, onChange }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl);
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div>
      {!value ? (
        <>
          <label
            htmlFor='photo-input'
            className='border-Box-Line flex h-[150px] w-full cursor-pointer flex-col items-center justify-center gap-[18px] rounded-xl border bg-white'
          >
            <Txt weight='bold' className='text-xl'>
              사진을 추가해 주세요
            </Txt>
            <Image
              src='/icons/ic_plus2.svg'
              alt='사진 추가'
              width={50}
              height={50}
              priority
            />
          </label>
          <input
            id='photo-input'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </>
      ) : (
        <div className='relative inline-block'>
          <Image
            src={value}
            alt='업로드한 사진 미리보기'
            width={150}
            height={150}
            unoptimized
            className='border-Box-Line h-[150px] w-[150px] rounded-[10px] border object-cover'
          />
          <button
            type='button'
            onClick={handleRemove}
            className='absolute top-2 right-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white'
            aria-label='사진 삭제'
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
