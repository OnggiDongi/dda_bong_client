'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';
import DatePicker from '@/components/common/DatePicker';

export default function SeniorSignUpPage() {
  const [joinDate, setJoinDate] = useState<Date>(new Date());
  const { showToast } = useToast();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    const phone = phoneRef.current?.value || '';

    if (password !== confirmPassword) {
      showToast('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8080/users/signup',
        {
          name,
          birthDate: joinDate.toISOString().split('T')[0], // yyyy-MM-dd
          email,
          password,
          phoneNumber: phone,
        },
        { withCredentials: true }
      );

      if (res.data.errorCode === 301) {
        showToast('이미 가입된 이메일 입니다');
        return;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // 서버에서 내려준 응답
        if (err.response) {
          // 검증 에러가 배열로 온 경우
          if (err.response.data.errors) {
            console.log(err.response.data.errors);
            showToast(err.response.data.errors[0].defaultMessage);
          }
        } else {
          showToast('회원가입 실패');
        }
      } else {
        showToast('회원가입 실패');
      }
    }
  };

  return (
    <main className='flex flex-col items-center pt-[54px]'>
      {/* 로고 */}
      <Image
        src='/icons/ic_logo.svg'
        alt='따봉 로고'
        width={100}
        height={60}
        className='object-contain pt-[18px]'
        priority
      />

      {/* 폼 컨테이너 */}
      <div className='w-[300px]'>
        <form className='flex flex-col gap-2'>
          {/* 이름 */}
          <div>
            <label className='block'>
              <Txt
                weight='semibold'
                className='text-Hana-Black block pb-2 text-2xl'
              >
                이름
              </Txt>
            </label>
            <Input
              type='text'
              ref={nameRef}
              placeholder='이름을 입력해주세요'
              required
              maxLength={20}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
            />
          </div>

          {/* 생년월일 */}
          <label className='block'>
            <Txt
              weight='semibold'
              className='text-Hana-Black block pb-2 text-2xl'
            >
              생년월일
            </Txt>
            <DatePicker
              value={joinDate}
              onChange={setJoinDate}
              disableFuture
              placeholder='생년월일을 선택하세요'
            />
          </label>

          {/* 이메일 */}
          <div>
            <label className='block'>
              <Txt
                weight='semibold'
                className='text-Hana-Black block pb-2 text-2xl'
              >
                이메일
              </Txt>
            </label>
            <Input
              type='email'
              ref={emailRef}
              placeholder='이메일을 입력해주세요'
              autoComplete='email'
              required
              maxLength={30}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className='block'>
              <Txt
                weight='semibold'
                className='text-Hana-Black block pb-2 text-2xl'
              >
                비밀번호
              </Txt>
            </label>
            <Input
              type='password'
              ref={passwordRef}
              placeholder='비밀번호를 입력해주세요'
              autoComplete='new-password'
              required
              maxLength={50}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className='block'>
              <Input
                type='password'
                ref={confirmPasswordRef}
                placeholder='비밀번호를 확인해주세요'
                autoComplete='new-password'
                required
                maxLength={50}
                className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
              />
            </label>
          </div>

          {/* 전화번호 */}
          <div>
            <label className='block'>
              <Txt
                weight='semibold'
                className='text-Hana-Black block pb-2 text-2xl'
              >
                전화번호
              </Txt>
            </label>
            <Input
              type='tel'
              ref={phoneRef}
              placeholder='전화번호를 입력해주세요'
              required
              maxLength={13}
              className='text-Hana-Black placeholder:text-Icon-Detail h-[50px] w-full pl-5 font-[AppleSDGothicNeoM] text-[26px] placeholder:font-[AppleSDGothicNeoM] placeholder:text-[26px]'
            />
          </div>

          {/* 회원가입 버튼 */}
          <Button
            type='submit'
            onClick={handleSubmit}
            className='mt-[30px] h-[50px] w-full'
            textWeight='semibold'
            textClassName='text-[26px]'
          >
            회원가입
          </Button>

          {/* 로그인으로 이동 */}
          <div className='flex items-center justify-center gap-2 pt-4'>
            <Txt weight='medium' className='text-Icon-Detail text-xl'>
              계정이 이미 있으신가요?
            </Txt>

            <Link href='/signIn'>
              <Txt
                weight='medium'
                className='text-Icon-Detail align-middle text-xl underline underline-offset-2'
              >
                로그인
              </Txt>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
