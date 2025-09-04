'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { useUser } from '@/hooks/mypage/mypage';
import { useUpdateUser } from '@/hooks/mypage/updateUser';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { isValidMobile } from './phone';

export type Preview = { url: string; file: File };

const fmtBirth = (d: Date) =>
  `${d.getFullYear()}.${`${d.getMonth() + 1}`.padStart(2, '0')}.${`${d.getDate()}`.padStart(2, '0')}`;

const same = (a?: string | null, b?: string | null) =>
  (a ?? '').trim() === (b ?? '').trim();
const hasText = (s?: string | null) => !!s && s.trim().length > 0;

export function useUserForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: user, isLoading, error } = useUser();
  const { mutate, isPending } = useUpdateUser();

  // form states
  const [avatar, setAvatar] = useState<Preview | null>(null);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');
  const [birth, setBirth] = useState<Date | null>(null);
  const [phoneError, setPhoneError] = useState('');

  // init from user
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

  // revoke old preview url
  useEffect(() => {
    return () => {
      if (avatar) URL.revokeObjectURL(avatar.url);
    };
  }, [avatar]);

  const nextRegion = useMemo(
    () => `${region} ${district}`.trim(),
    [region, district]
  );
  const nextBirthStr = useMemo(() => (birth ? fmtBirth(birth) : ''), [birth]);

  const onChangeAvatar = useCallback(
    (f: File | undefined | null) => {
      if (!f) return;
      if (avatar) URL.revokeObjectURL(avatar.url);
      setAvatar({ file: f, url: URL.createObjectURL(f) });
    },
    [avatar]
  );

  const submit = useCallback(() => {
    if (!user) return;

    if (hasText(phone) && !isValidMobile(phone.trim())) {
      setPhoneError(
        '휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)'
      );
      showToast('휴대폰 번호 형식이 올바르지 않습니다.');
      return;
    }

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
      fd.append('birthdate', nextBirthStr);
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
  }, [
    user,
    phone,
    password,
    password2,
    avatar,
    birth,
    nextBirthStr,
    nextRegion,
    category,
    showToast,
    router,
    mutate,
  ]);

  return {
    // query
    user,
    isLoading,
    error,
    // states
    avatar,
    setAvatar,
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
    // meta
    isPending,
    // actions
    submit,
  };
}
