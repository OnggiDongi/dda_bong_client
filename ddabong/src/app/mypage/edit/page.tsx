'use client';

import { AvatarPicker } from '@/utils/mypage/AvatarPicker';
import { isValidMobile } from '@/utils/mypage/phone';
import { useUserForm } from '@/utils/mypage/useUserForm';
import Image from 'next/image';
import { useEffect } from 'react';
import Category from '@/components/admin/register/Category';
import LocationSelect from '@/components/apply/LocationSelect';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';
import DatePicker from '@/components/common/DatePicker';

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

export default function MyEditPage() {
  const {
    user,
    isLoading,
    error,
    avatar,
    onChangeAvatar,
    password,
    setPassword,
    password2,
    setPassword2,
    phone,
    setPhone,
    phoneError,
    setPhoneError,
    region,
    setRegion,
    district,
    setDistrict,
    category,
    setCategory,
    birth,
    setBirth,
    isPending,
    submit,
  } = useUserForm();

  useEffect(() => {
    if (category) setCategory(category);
    if (region) setRegion(region);
    if (district) setDistrict(district);
  }, [region, district, category, setCategory, setRegion, setDistrict]);

  if (isLoading)
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Image
          src='/video/loading.gif'
          alt='로딩 중'
          width={130}
          height={130}
          unoptimized
        />
      </div>
    );
  if (error || !user)
    return (
      <main className='mx-auto max-w-[430px] p-6'>오류가 발생했습니다.</main>
    );

  return (
    <main className='relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-white'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <TopBar title='내 정보 수정' />

        {/* 프로필 */}
        <section className='mt-4 flex items-center justify-center'>
          <AvatarPicker
            avatar={avatar}
            fallback={
              user.profileImage && user.profileImage !== 'DEFAULT_IMG'
                ? user.profileImage
                : 'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/7edb4d83-5813-4032-8292-e9f73c086474-(Frame 2087326976.png)'
            }
            onPick={(f: File) => f && onChangeAvatar(f)}
          />
        </section>

        {/* 입력 영역 */}
        <section className='space-y-5 px-[26px] pt-6 pb-5'>
          <Field label='이름'>
            <Input
              type='text'
              value={user.name ?? ''}
              disabled
              maxLength={50}
              className='bg-Page-Background h-[50px] w-full pl-5 text-[26px]'
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
        <div className='sticky right-0 bottom-0 left-0 mx-auto w-full max-w-[430px] bg-transparent'>
          <div className='border-t border-black/5 bg-white px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+10px)] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]'>
            <Button
              type='submit'
              className='h-[45px] w-full rounded-2xl'
              disabled={isPending || !!phoneError}
            >
              {isPending ? '수정 중…' : '수정 완료'}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
