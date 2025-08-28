'use client';

import { useState } from 'react';
import RecruitForm from '@/components/admin/recruit/write/RecruitForm';
import RecruitHeader from '@/components/admin/recruit/write/RecruitHeader';
import SupportOption from '@/components/admin/recruit/write/SupportOption';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export default function RecruitWritePage() {
  const [volunDate, setVolunDate] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);

  const handleChangeServiceDate = (d: Date) => {
    setVolunDate(d);
  };

  const handleChangeDeadline = (d: Date) => {
    setDeadline(d);
  };

  const isDeadlineValid =
    !!deadline && !!volunDate && startOfDay(deadline) < startOfDay(volunDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!volunDate) {
      alert('봉사 날짜를 선택해 주세요.');
      return;
    }
    if (!deadline) {
      alert('모집 마감일을 선택해 주세요.');
      return;
    }
    if (!isDeadlineValid) {
      alert('모집 마감일은 봉사 날짜보다 앞서야 해요.');
      return;
    }

    // TODO: 통과 시 서버 전송 로직
    alert('작성 완료!');
  };

  return (
    <form
      className='bg-page-gradient flex flex-col gap-4 px-6 py-5'
      onSubmit={handleSubmit}
    >
      <RecruitHeader />

      <RecruitForm
        volunDate={volunDate}
        deadline={deadline}
        onChangeVolunDate={handleChangeServiceDate}
        onChangeDeadline={handleChangeDeadline}
      />

      <div>사진 추가 컴포넌트</div>

      <SupportOption />

      <label className='block'>
        <Txt className='block text-xl'>자세한 설명</Txt>
      </label>
      <textarea
        placeholder='게시글을 작성해주세요'
        required
        className='border-Box-Line placeholder:text-Icon-Detail h-[150px] w-full rounded-xl border bg-white px-5 py-3 text-lg focus:outline-none'
      />

      <Button type='submit' className='h-[45px] w-full'>
        작성 완료
      </Button>
    </form>
  );
}
