'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { fmtDate } from '@/hooks/admin/home/fomat';
import { useCreateActivityPostMutation } from '@/hooks/mutations/useCreateActivityPostMutation';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const activityId = searchParams.get('id');

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
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  const { showToast } = useToast();

  const { mutate, isPending } = useCreateActivityPostMutation();

  const isDeadlineValid =
    !!deadline && !!volunDate && startOfDay(deadline) < startOfDay(volunDate);

  const isTimeFilled =
    !!startTime.ampm && !!startTime.hour && !!startTime.minute;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!activityId) {
      showToast('잘못된 접근입니다.', 'error');
      return;
    }

    if (!volunDate) {
      showToast('봉사 날짜를 선택해 주세요.', 'error');
      return;
    }
    if (!deadline) {
      showToast('모집 마감일을 선택해 주세요.', 'error');
      return;
    }
    if (!isDeadlineValid) {
      showToast('모집 마감일은 봉사 날짜보다 앞서야 해요.', 'error');
      return;
    }
    if (!isTimeFilled) {
      showToast('시작 시간(오전/오후, 시, 분)을 모두 선택해 주세요.', 'error');
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

    const body = {
      title,
      content: description,
      activityId: Number(activityId),
      startAt: fmtDate(volunDate).concat(` ${hh}:${mm}`),
      activityTime: totalHours ? Number(totalHours) : 0,
      recruitmentEnd: deadline ? fmtDate(deadline) : fmtDate(new Date()),
      location: place,
      supports: Array.from(support),
      capacity: Number(capacity),
      image: photoUrl ?? undefined,
    };

    console.log(typeof body.activityTime);

    mutate(body, {
      onSuccess: () => {
        showToast('작성이 완료되었습니다.', 'success');
        router.push('/admin/review');
      },
      onError: (error) => {
        console.error(error);
        showToast('작성에 실패하였습니다.', 'error');
      },
    });
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
        <Button
          type='submit'
          form='recruit-form'
          className='h-[45px] w-full'
          disabled={isPending}
        >
          {isPending ? '작성 중...' : '작성 완료'}
        </Button>
      </div>
    </>
  );
}
