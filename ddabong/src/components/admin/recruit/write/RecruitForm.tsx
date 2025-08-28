'use client';

import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';
import DatePicker from '@/components/common/DatePicker';
import TimePicker from './TimePicker';
import type { TimeValue } from './TimePicker';

type Props = {
  title: string;
  place: string;
  volunDate: Date | null;
  deadline: Date | null;
  startTime: TimeValue;
  totalHours: number | '';
  capacity: number | '';
  description: string;

  onChangeTitle: (v: string) => void;
  onChangePlace: (v: string) => void;
  onChangeVolunDate: (d: Date) => void;
  onChangeDeadline: (d: Date) => void;
  onChangeStartTime: (t: TimeValue) => void;
  onChangeTotalHours: (v: number | '') => void;
  onChangeCapacity: (v: number | '') => void;
  onChangeDescription: (v: string) => void;
};

export default function RecruitForm({
  title,
  place,
  volunDate,
  deadline,
  startTime,
  totalHours,
  capacity,
  description,
  onChangeTitle,
  onChangePlace,
  onChangeVolunDate,
  onChangeDeadline,
  onChangeStartTime,
  onChangeTotalHours,
  onChangeCapacity,
  onChangeDescription,
}: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Txt className='block pb-1 text-xl'>제목</Txt>
        <Input
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          type='text'
          placeholder='제목'
          maxLength={20}
          className='placeholder:text-Icon-Detail h-[43px] w-full px-5 text-lg'
          aria-label='제목'
        />
      </div>

      <div>
        <Txt className='block pb-2 text-xl'>장소</Txt>
        <Input
          value={place}
          onChange={(e) => onChangePlace(e.target.value)}
          type='text'
          placeholder='주소 입력'
          maxLength={128}
          className='placeholder:text-Icon-Detail h-[43px] w-full px-5 text-lg'
          aria-label='장소'
        />
      </div>

      <div>
        <Txt className='block pb-2 text-xl'>봉사 날짜</Txt>
        <DatePicker
          value={volunDate}
          onChange={onChangeVolunDate}
          disablePast
          placeholder='봉사 날짜를 선택하세요'
          className='h-[43px]'
          textClassName='text-lg'
        />
      </div>

      <div>
        <Txt className='block pb-2 text-xl'>시작 시간</Txt>
        <TimePicker value={startTime} onChange={onChangeStartTime} />
      </div>

      <div>
        <Txt className='block pb-2 text-xl'>총 봉사 시간</Txt>
        <Input
          type='number'
          value={totalHours}
          onChange={(e) =>
            onChangeTotalHours(
              e.target.value === '' ? '' : Number(e.target.value)
            )
          }
          placeholder='최대 12시간'
          max={12}
          min={0}
          className='placeholder:text-Icon-Detail h-[43px] w-full px-5 text-lg'
          aria-label='총 봉사 시간'
        />
      </div>

      <div>
        <Txt className='block pb-2 text-xl'>정원</Txt>
        <Input
          type='number'
          value={capacity}
          onChange={(e) =>
            onChangeCapacity(
              e.target.value === '' ? '' : Number(e.target.value)
            )
          }
          placeholder='모집 정원 입력'
          min={1}
          className='placeholder:text-Icon-Detail h-[43px] w-full px-5 text-lg'
          aria-label='정원'
        />
      </div>

      <div>
        <Txt className='block pb-2 text-xl'>모집 마감일</Txt>
        <DatePicker
          value={deadline}
          onChange={onChangeDeadline}
          disablePast
          placeholder='마감일을 선택하세요'
          className='h-[43px]'
          textClassName='text-lg'
        />
      </div>

      <div>
        <Txt className='block pb-2 text-xl'>자세한 설명</Txt>
        <textarea
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder='게시글을 작성해주세요'
          className='placeholder:text-Icon-Detail border-Box-Line h-[150px] w-full resize-none overflow-y-auto rounded-xl border bg-white p-3 text-lg focus:outline-none'
          aria-label='자세한 설명'
        />
      </div>
    </div>
  );
}
