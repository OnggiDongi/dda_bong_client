'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { useUser } from '@/hooks/mypage/mypage';
import { useUpdateUser } from '@/hooks/mypage/updateUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isValidMobile } from '@/lib/phone';
import Category from '@/components/admin/register/Category';
import LocationSelect from '@/components/apply/LocationSelect';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';
import DatePicker from '@/components/common/DatePicker';

type Preview = { url: string; file: File };

export default function MyEditPage() {
  const router = useRouter();
  const { data: user, isLoading, error } = useUser();
  const { showToast } = useToast();
  const { mutate, isPending } = useUpdateUser();

  const [avatar, setAvatar] = useState<Preview | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');
  const [birth, setBirth] = useState<Date | null>(null);

  const [phoneError, setPhoneError] = useState<string>('');

  // 유저 정보 로딩 완료 시 폼 초기화
  useEffect(() => {
    if (!user) return;
    setPhone(user.phoneNumber ?? '');
    setCategory(user.preferredCategory ?? '');

    const raw = (user.preferredRegion ?? '').trim();
    if (raw) {
      const parts = raw.split(/\s+/);
      setRegion(parts[0] ?? '');
      setDistrict(parts.slice(1).join(' ') ?? '');
    } else {
      setRegion('');
      setDistrict('');
    }

    if (user.birthdate) setBirth(new Date(user.birthdate));
  }, [user]);

  // 아바타 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (avatar) URL.revokeObjectURL(avatar.url);
    };
  }, [avatar]);

  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (avatar) URL.revokeObjectURL(avatar.url);
    setAvatar({ file: f, url: URL.createObjectURL(f) });
    e.currentTarget.value = '';
  };

  // yyyy.MM.dd 포맷
  const fmtBirth = (d: Date) => {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${y}.${m}.${day}`;
  };

  const same = (a?: string | null, b?: string | null) =>
    (a ?? '').trim() === (b ?? '').trim();

  const hasText = (s?: string | null) => !!s && s.trim().length > 0;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    if (hasText(phone) && !isValidMobile(phone.trim())) {
      setPhoneError(
        '휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)'
      );
      showToast('휴대폰 번호 형식이 올바르지 않습니다.');
      return;
    }

    // 비밀번호 일치 검증
    if ((password || password2) && password !== password2) {
      showToast('비밀번호가 일치하지 않습니다.');
      return;
    }

    const fd = new FormData();
    let changes = 0;

    const prevPhone = user.phoneNumber ?? '';
    const prevRegion = (user.preferredRegion ?? '').trim();
    const prevCat = user.preferredCategory ?? '';
    const prevBirthStr = user.birthdate
      ? fmtBirth(new Date(user.birthdate))
      : '';

    // 다음 값
    const nextRegion = `${region} ${district}`.trim();
    const nextBirthStr = birth ? fmtBirth(birth) : '';

    // 변경된 것만 append (빈 문자열은 절대 append하지 않음)
    if (avatar?.file) {
      fd.append('profileImage', avatar.file);
      changes++;
    }

    if (hasText(password)) {
      fd.append('password', password);
      changes++;
    }

    if (hasText(phone) && !same(phone, prevPhone)) {
      fd.append('phoneNumber', phone.trim());
      changes++;
    }

    if (birth && nextBirthStr !== prevBirthStr) {
      fd.append('birthDate', nextBirthStr);
      changes++;
    }

    if (hasText(nextRegion) && !same(nextRegion, prevRegion)) {
      fd.append('preferredRegion', nextRegion);
      changes++;
    }

    if (hasText(category) && !same(category, prevCat)) {
      fd.append('preferredCategory', category);
      changes++;
    }

    // 변경사항 없어도 마이페이지로 이동
    if (changes === 0) {
      showToast('변경된 내용이 없습니다.');
      router.replace('/mypage');
      return;
    }

    mutate(fd, {
      onSuccess: () => {
        showToast('내 정보가 수정되었습니다.');
        router.replace('/mypage');
      },
      onError: () => {
        showToast('수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
  };

  return (
    <main className='relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-white'>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>오류가 발생했습니다.</p>
      ) : (
        <form onSubmit={onSubmit} className='pb-[120px]'>
          <TopBar title='내 정보 수정' />

          {/* 프로필 */}
          <section className='mt-4 flex items-center justify-center'>
            <div className='relative h-[120px] w-[120px]'>
              <Image
                src={
                  avatar?.url ??
                  user?.profileImage ??
                  'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/7edb4d83-5813-4032-8292-e9f73c086474-(Frame 2087326976.png)'
                }
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
                onChange={onChangeAvatar}
                className='hidden'
              />
            </div>
          </section>

          {/* 입력 영역 */}
          <section className='space-y-5 px-[26px] pt-6'>
            <Field label='이름'>
              <Input
                type='text'
                value={user?.name ?? ''}
                disabled
                maxLength={50}
                className='bg-Page-Background text-Hana-Black h-[50px] w-full pl-5 text-[26px]'
              />
            </Field>

            <Field label='비밀번호'>
              <Input
                type='password'
                placeholder='새로운 비밀번호를 입력해주세요'
                autoComplete='new-password'
                maxLength={50}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='h-[50px] w-full pl-5 text-2xl'
              />
              <div className='h-3' />
              <Input
                type='password'
                placeholder='비밀번호를 확인해주세요'
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className='h-[50px] w-full pl-5 text-2xl'
              />
            </Field>

            <Field label='전화번호'>
              <Input
                type='tel'
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError('');
                }}
                onBlur={() => {
                  if (phone && !isValidMobile(phone.trim())) {
                    setPhoneError(
                      '휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)'
                    );
                  }
                }}
                // 브라우저 기본 검증도 같이 사용
                inputMode='tel'
                pattern='^(01[016789])-(\d{3,4})-(\d{4})$'
                title='예: 010-1234-5678'
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? 'phone-error' : undefined}
                placeholder='010-1234-5678'
                className='h-[50px] w-full pl-5 text-2xl'
              />
              {phoneError && (
                <p id='phone-error' className='mt-1 text-sm text-red-500'>
                  {phoneError}
                </p>
              )}
            </Field>

            <Field label='생년월일'>
              <DatePicker
                value={birth ?? undefined}
                onChange={(d) => setBirth(d ?? null)}
                disableFuture
                placeholder='생년월일을 선택하세요'
              />
            </Field>

            <Field label='관심 분야'>
              <div className='[&_*]:text-2xl'>
                <Category value={category} onValueChange={setCategory} />
              </div>
            </Field>

            <Field label='봉사 선호 지역'>
              <div className='[&_*]:text-2xl'>
                <LocationSelect
                  region={region}
                  district={district}
                  onRegionChange={setRegion}
                  onDistrictChange={setDistrict}
                />
              </div>
            </Field>
          </section>

          {/* 하단 버튼 */}
          <div className='fixed bottom-0 left-0 w-full bg-white px-6 py-3 shadow-[0_0_5px_0_rgba(0,0,0,0.15)]'>
            <Button
              type='submit'
              className='h-[45px] w-full'
              disabled={isPending || !!phoneError}
            >
              {isPending ? '수정 중…' : '수정 완료'}
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Txt className='mb-2 block text-2xl'>{label}</Txt>
      {children}
    </div>
  );
}
