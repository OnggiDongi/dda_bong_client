'use client';

import { useState } from 'react';
import PhotoUpload from '@/components/admin/recruit/write/PhotoUpload';
import RecruitForm from '@/components/admin/recruit/write/RecruitForm';
import RecruitHeader from '@/components/admin/recruit/write/RecruitHeader';
import SupportOption, {
  SupportKey,
} from '@/components/admin/recruit/write/SupportOption';
import type { TimeValue } from '@/components/admin/recruit/write/TimePicker';
import Button from '@/components/atoms/Button';

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export default function RecruitWritePage() {
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [volunDate, setVolunDate] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<TimeValue>({
    ampm: '',
    hour: '',
    minute: '',
  });
  const [totalHours, setTotalHours] = useState<number | ''>('');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [support, setSupport] = useState<Set<SupportKey>>(new Set());
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const isDeadlineValid =
    !!deadline && !!volunDate && startOfDay(deadline) < startOfDay(volunDate);

  const isTimeFilled =
    !!startTime.ampm && !!startTime.hour && !!startTime.minute;

  // TODO: 추후에 서버 api 랑 연결
  // 서버 업로드 요청
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const res = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     if (!res.ok) throw new Error('업로드 실패');

  //     const data = await res.json();
  //     setPhotoUrl(data.url);
  //   } catch (err) {
  //     console.error(err);
  //     alert('사진 업로드에 실패했습니다.');
  //   }
  // };

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
    if (!isTimeFilled) {
      alert('시작 시간(오전/오후, 시, 분)을 모두 선택해 주세요.');
      return;
    }

    // 시간 변환(12h -> 24h)
    const to24 = (ampm: 'AM' | 'PM', hourStr: string) => {
      const h = Number(hourStr);
      if (ampm === 'AM') return h === 12 ? 0 : h;
      return h === 12 ? 12 : h + 12;
    };

    const hh = String(
      to24(startTime.ampm as 'AM' | 'PM', startTime.hour ?? '')
    ).padStart(2, '0');
    const mm = startTime.minute;

    const result = {
      title,
      place,
      volunDate: volunDate.toISOString(),
      deadline: deadline.toISOString(),
      startTime: `${hh}:${mm}`,
      totalHours: totalHours,
      capacity: capacity,
      description,
      support: Array.from(support),
      photoUrl,
    };

    console.log('제출 데이터:', result);
    alert('작성 완료꾸잉');
  };

  return (
    <>
      <form
        id='recruit-form'
        className='bg-page-gradient flex flex-col gap-4 px-6 py-5'
        onSubmit={handleSubmit}
      >
        <RecruitHeader />
        <RecruitForm
          title={title}
          place={place}
          volunDate={volunDate}
          deadline={deadline}
          startTime={startTime}
          totalHours={totalHours}
          capacity={capacity}
          description={description}
          onChangeTitle={setTitle}
          onChangePlace={setPlace}
          onChangeVolunDate={setVolunDate}
          onChangeDeadline={setDeadline}
          onChangeStartTime={setStartTime}
          onChangeTotalHours={setTotalHours}
          onChangeCapacity={setCapacity}
          onChangeDescription={setDescription}
        />
        <PhotoUpload value={photoUrl} onChange={setPhotoUrl} />
        <SupportOption value={support} onChange={setSupport} />
      </form>
      <div className='fixed bottom-0 left-0 w-full bg-white px-6 py-3 shadow-[0_0_5px_0_rgba(0,0,0,0.15)]'>
        <Button type='submit' form='recruit-form' className='h-[45px] w-full'>
          작성 완료
        </Button>
      </div>
    </>
  );
}
