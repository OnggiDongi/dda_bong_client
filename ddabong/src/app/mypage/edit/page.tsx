'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Category from '@/components/admin/register/Category';
import LocationSelect from '@/components/apply/LocationSelect';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';
import DatePicker from '@/components/common/DatePicker';

type Preview = { url: string; file: File };

export default function MyEditPage() {
  // 프로필 미리보기
  const [avatar, setAvatar] = useState<Preview | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // 서버에서 받아온 기존 값이라고 가정
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setPhone] = useState('010-4113-0361');
  const [birth, setBirth] = useState('2000.09.05');

  const user = {
    name: '시별돌',
    email: 'sibd@naver.com',
    birth: '1968.09.08',
    grade: 'SILVER',
    profile: '/icons/beeber.svg',
    region: '파주시',
    category: '농어촌',
  };

  useEffect(() => {
    return () => {
      if (avatar) URL.revokeObjectURL(avatar.url);
    };
  }, [avatar]);
  const [joinDate, setJoinDate] = useState<Date>(new Date());

  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (avatar) URL.revokeObjectURL(avatar.url);
    setAvatar({ file: f, url: URL.createObjectURL(f) });
    e.currentTarget.value = '';
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 둘 중 하나라도 채웠다면 일치해야 통과
    if ((password || password2) && password !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 서버 전송 로직
    alert('수정 완료!');
  };
  const [category, setCategory] = useState('');

  return (
    <main className='relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-white'>
      <form onSubmit={onSubmit} className='pb-[120px]'>
        {/* 제목 */}
        <TopBar title='내 정보 수정' />
        {/* 프로필 */}
        <section className='mt-4 flex items-center justify-center'>
          <div className='relative h-[120px] w-[120px]'>
            <Image
              src={avatar?.url ?? '/icons/ic_senior.svg'}
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
          {/* 이름 (수정 불가) */}
          <Field label='이름'>
            <Input
              type='name'
              value={user.name}
              disabled
              maxLength={50}
              className='bg-Page-Background text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
            />
          </Field>

          {/* 비밀번호 */}
          <Field label='비밀번호'>
            <Input
              type='password'
              placeholder='새로운 비밀번호를 입력해주세요'
              autoComplete='new-password'
              required
              maxLength={50}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-2xl placeholder:font-[AppleSDGothicNeoM] placeholder:text-2xl'
            />
            <div className='h-3' />
            <Input
              type='password'
              placeholder='비밀번호를 확인해주세요'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-2xl placeholder:font-[AppleSDGothicNeoM] placeholder:text-2xl'
            />
          </Field>

          {/* 전화번호 */}
          <Field label='전화번호'>
            <Input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-2xl placeholder:font-[AppleSDGothicNeoM] placeholder:text-2xl'
            />
          </Field>

          {/* 생년월일 */}
          <Field label='생년월일'>
            <DatePicker
              value={joinDate}
              onChange={setJoinDate}
              disableFuture
              placeholder='생년월일을 선택하세요'
            />
          </Field>

          {/* 관심 분야 */}
          <Field label='관심 분야'>
            <div className='[&_*]:text-2xl'>
              <Category
                value={category}
                onValueChange={(value) => setCategory(value)}
              />
            </div>
          </Field>

          {/* 봉사 선호 지역 */}
          <Field label='봉사 선호 지역'>
            <div className='[&_*]:text-2xl'>
              <LocationSelect />
            </div>
          </Field>
        </section>

        <div className='fixed bottom-0 left-0 w-full bg-white px-6 py-3 shadow-[0_0_5px_0_rgba(0,0,0,0.15)]'>
          <Button type='submit' form='edit-form' className='h-[45px] w-full'>
            수정
          </Button>
        </div>
      </form>
    </main>
  );
}

/* ------- 작은 컴포넌트 ------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Txt weight='semibold' className='text-Hana-Black mb-2 block text-2xl'>
        {label}
      </Txt>
      {children}
    </div>
  );
}
