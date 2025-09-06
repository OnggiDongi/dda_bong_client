'use client';

import { useToast } from '@/contexts/toast/ToastContext';
import { fetchDetailedActivityPost } from '@/hooks/admin/activity';
import {
  useUpdateActivityPostMutation,
  type UpdateVariables,
} from '@/hooks/mutations/useActivityMutations';
import type { DetailedActivityPost } from '@/types/activity';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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

export default function RecruitEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const activityPostId = Number(id);

  const [activityId, setActvityId] = useState(0);
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
  const [photoUrl, setPhotoUrl] = useState<File | string | null>(null);
  const { showToast } = useToast();

  const { data: post } = useQuery<DetailedActivityPost>({
    queryKey: ['activityPost', activityPostId],
    queryFn: () => fetchDetailedActivityPost(activityPostId),
    enabled: !!activityPostId,
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setPlace(post.location || '');
      setVolunDate(post.startDate ? new Date(post.startDate) : null);
      setActvityId(post.activityId || 0);
      setDeadline(
        post.recruitmentEndDate ? new Date(post.recruitmentEndDate) : null
      );
      setTotalHours(Number(post.time));
      setSupport(
        new Set(
          (post.supports ?? []).filter((item): item is SupportKey =>
            ['bus', 'snack', 'plancard'].includes(item)
          )
        )
      );

      if (post.startDate) {
        const timePart = post.startDate.split(' ')[1];

        const [hour, minute] = timePart.split(':');

        const hourNum = Number(hour);

        setStartTime({
          ampm: hourNum >= 12 ? 'PM' : 'AM',
          hour: String(hourNum % 12 || 12),
          minute: String(minute),
        });
      }
      // totalHours is not available in DetailedActivityPost
      setCapacity(post.capacity || '');
      setDescription(post.content || '');
      setPhotoUrl(post.imageUrl || null);
    }
  }, [post]);

  const isDeadlineValid =
    !!deadline && !!volunDate && startOfDay(deadline) < startOfDay(volunDate);

  const isTimeFilled =
    !!startTime.ampm && !!startTime.hour && !!startTime.minute;

  const updateMutation = useUpdateActivityPostMutation();

  const fmtDate = (d: Date) =>
    `${d.getFullYear()}.${`${d.getMonth() + 1}`.padStart(2, '0')}.${`${d.getDate()}`.padStart(2, '0')}`;

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

    const to24 = (ampm: 'AM' | 'PM', hourStr: string) => {
      const h = Number(hourStr);
      if (ampm === 'AM') return h === 12 ? 0 : h;
      return h === 12 ? 12 : h + 12;
    };

    const hh = String(
      to24(startTime.ampm as 'AM' | 'PM', startTime.hour ?? '')
    ).padStart(2, '0');
    const mm = startTime.minute;

    const result: UpdateVariables = {
      id: activityPostId,
      title,
      location: place,
      startAt: fmtDate(volunDate).concat(` ${hh}:${mm}`),
      recruitmentEnd: deadline ? fmtDate(deadline) : fmtDate(new Date()),
      activityTime: totalHours ? Number(totalHours) : 0,
      capacity: Number(capacity),
      content: description,
      activityId: activityId,
      supports: Array.from(support),
    };

    if (photoUrl instanceof File) {
      result.image = photoUrl;
    }

    updateMutation.mutate(result, {
      onSuccess: () => {
        showToast('수정이 완료되었습니다.');
        router.push(`/admin/recruit/${activityPostId}`);
      },
      onError: () => {
        showToast('수정에 실패했습니다.', 'error');
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
        <Button type='submit' form='recruit-form' className='h-[45px] w-full'>
          수정 완료
        </Button>
      </div>
    </>
  );
}
