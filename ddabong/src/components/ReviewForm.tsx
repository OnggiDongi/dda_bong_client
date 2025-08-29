'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import StarRating from '@/components/StarRating';
import Txt from '@/components/atoms/Text';
import Button from './atoms/Button';

type Preview = { url: string; file: File };
type Variant = 'user' | 'admin';

export default function ReviewForm({
  variant = 'user',
}: {
  variant?: Variant;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  // 공통: 후기 텍스트
  const [review, setReview] = useState('');

  // 사용자용: 단일 별점 + 사진
  const [userRating, setUserRating] = useState(0);
  const [photo, setPhoto] = useState<Preview | null>(null);

  // 관리자용: 3개 항목 별점
  const [diligence, setDiligence] = useState(0); // 성실도
  const [friendliness, setFriendliness] = useState(0); // 친화력
  const [health, setHealth] = useState(0); // 건강 상태

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

    // 네이티브 required 검증
    if (!form.reportValidity()) return;

    // TODO: 서버 전송(FormData) 필요 시 여기서 처리
    // const data = new FormData(form);

    router.push('/myreview');
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className='flex flex-col pb-20'>
      {/* 별점 */}
      <section className='text-center'>
        <div className='pt-9 pb-4'>
          <Txt
            weight='bold'
            className={cn(variant === 'admin' ? 'text-lg' : 'text-[22px]')}
          >
            {variant === 'admin'
              ? '봉사자를 평가해 주세요'
              : '이번 봉사가 어떠셨나요?'}
          </Txt>
        </div>

        {/* 별점 영역 */}
        {variant === 'user' ? (
          <StarRating
            value={userRating}
            onChange={setUserRating}
            max={5}
            size={40}
            className='justify-center'
            name='user_rating'
            required
          />
        ) : (
          // 관리자: 3개 항목 카드 형태
          <div className='border-Box-Line mx-[26px] rounded-[16px] border bg-white p-4'>
            {/* 성실도 */}
            <div className='flex items-center justify-between py-3'>
              <Txt className='text-sm'>성실도</Txt>
              <div className='flex items-center gap-7'>
                <StarRating
                  value={diligence}
                  onChange={setDiligence}
                  max={5}
                  size={30}
                  name='rating_diligence'
                  required
                />
                <Txt className='text-sm'>{diligence.toFixed(1)}</Txt>
              </div>
            </div>
            <div className='my-1 h-px w-full' />

            {/* 친화력 */}
            <div className='flex items-center justify-between py-3'>
              <Txt className='text-sm'>친화력</Txt>
              <div className='flex items-center gap-7'>
                <StarRating
                  value={friendliness}
                  onChange={setFriendliness}
                  max={5}
                  size={30}
                  name='rating_friendliness'
                  required
                />
                <Txt className='text-sm'>{friendliness.toFixed(1)}</Txt>
              </div>
            </div>
            <div className='my-1 h-px w-full' />

            {/* 건강 상태 */}
            <div className='flex items-center justify-between py-3'>
              <Txt className='text-sm'>건강 상태</Txt>
              <div className='flex items-center gap-7'>
                <StarRating
                  value={health}
                  onChange={setHealth}
                  max={5}
                  size={30}
                  name='rating_health'
                  required
                />
                <Txt className='text-sm'>{health.toFixed(1)}</Txt>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== 후기 입력 ===== */}
      <section className='mt-10 mb-11 px-[26px]'>
        <div className='pb-[6px]'>
          <Txt
            weight='bold'
            className={cn(variant === 'admin' ? 'text-[18px]' : 'text-[22px]')}
          >
            {variant === 'admin'
              ? '이번 봉사자는 어떤 분이었나요?'
              : '생생한 후기를 나눠봐요!'}
          </Txt>
        </div>

        <textarea
          name='review'
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder={
            variant === 'admin'
              ? '특이사항이나 참고할 점을 적어주세요.'
              : '후기를 입력해주세요.'
          }
          required
          className={cn(
            'placeholder:text-Icon-Detail border-Box-Line h-[150px] w-full resize-none overflow-y-auto rounded-[10px] border bg-white p-3 focus:outline-none',
            variant === 'admin'
              ? 'font-[AppleSDGothicNeoM] text-base'
              : 'font-[AppleSDGothicNeoSB] text-xl'
          )}
        />

        {/* ===== 사용자 전용: 사진 업로드 ===== */}
        {variant === 'user' && (
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
        )}
      </section>

      <div className='fixed bottom-0 left-0 w-full bg-white px-6 py-3 shadow-[0_0_5px_0_rgba(0,0,0,0.15)]'>
        <Button type='submit' form='recruit-form' className='h-[45px] w-full'>
          작성 완료
        </Button>
      </div>
    </form>
  );
}
