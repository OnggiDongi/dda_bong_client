'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import StarRating from '@/components/StarRating';
import BottomButton from '@/components/atoms/BottomButton';
import Txt from '@/components/atoms/Text';

type Preview = { url: string; file: File };

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState<Preview | null>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo.url);
    };
  }, [photo]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto({ file: f, url: URL.createObjectURL(f) });
    e.currentTarget.value = '';
  };

  const removePhoto = () => {
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto(null);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    router.push('/myreview');
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className='flex flex-col'>
      {/* 별점 */}
      <section className='text-center'>
        <div className='pt-9 pb-4'>
          <Txt weight='bold' className='text-[22px]'>
            이번 봉사가 어떠셨나요?
          </Txt>
        </div>
        <StarRating
          value={rating}
          onChange={setRating}
          max={5}
          size={40}
          className='justify-center'
          name='rating' // ← 폼 전송/검증용 이름
          required // ← 필수로 지정(StarRating 내부 첫 라디오에만 required 반영)
        />
      </section>

      {/* 후기 입력 + 이미지 */}
      <section className='mt-10 mb-6 px-[26px]'>
        <div className='pb-[6px]'>
          <Txt weight='bold' className='mb-2 text-[22px]'>
            생생한 후기를 나눠봐요!
          </Txt>
        </div>

        {/* ← name + required 가 있어야 네이티브 검증이 동작 */}
        <textarea
          name='review'
          placeholder='후기를 입력해주세요.'
          required
          className='placeholder:text-Icon-Detail border-Box-Line h-[150px] w-full resize-none overflow-y-auto rounded-[10px] border bg-white p-3 text-xl focus:outline-none'
        />

        <div className='mt-[30px]'>
          {!photo ? (
            <>
              <label
                htmlFor='photo-input'
                className='border-Box-Line flex h-[150px] w-full cursor-pointer flex-col items-center justify-center gap-[18px] rounded-[10px] border bg-white'
              >
                <Txt weight='bold' className='text-xl'>
                  사진을 추가해 주세요
                </Txt>
                <Image
                  src='/icons/ic_plus.svg'
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
                onChange={onChangeFile}
              />
            </>
          ) : (
            <div className='relative inline-block'>
              <Image
                src={photo.url}
                alt='업로드한 사진 미리보기'
                width={150}
                height={150}
                unoptimized
                className='border-Box-Line h-[150px] w-[150px] rounded-[10px] border object-cover'
              />
              <button
                type='button'
                onClick={removePhoto}
                className='absolute top-2 right-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white'
                aria-label='사진 삭제'
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 하단 버튼: submit으로 사용 */}
      <BottomButton type='submit' />
    </form>
  );
}
