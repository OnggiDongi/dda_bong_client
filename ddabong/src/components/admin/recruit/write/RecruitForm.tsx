'use client';

import Input from '@/components/atoms/Input';
import Txt from '@/components/atoms/Text';
import DatePicker from '@/components/common/DatePicker';
import TimePicker from './TimePicker';

type Props = {
  volunDate: Date | null;
  deadline: Date | null;
  onChangeVolunDate: (d: Date) => void;
  onChangeDeadline: (d: Date) => void;
};

export default function RecruitForm({
  volunDate,
  deadline,
  onChangeVolunDate,
  onChangeDeadline,
}: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Txt className='block pb-1 text-xl'>제목</Txt>
        <Input
          type='text'
          placeholder='제목'
          required
          maxLength={20}
          className='placeholder:text-Icon-Detail h-[43px] w-full px-5 text-lg'
        />
      </div>

      {/* 장소 */}
      <div>
        <Txt className='block pb-2 text-xl'>장소</Txt>
        <Input
          type='text'
          placeholder='주소 입력'
          required
          maxLength={128}
          className='placeholder:text-Icon-Detail h-[43px] w-full px-5 text-lg'
        />
      </div>

      {/* 봉사 날짜 */}
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

      {/* 시작 시간 */}
      <div>
        <Txt className='block pb-2 text-xl'>시작 시간</Txt>
        <TimePicker />
      </div>

      {/* 총 봉사 시간 */}
      <div>
        <Txt className='block pb-2 text-xl'>총 봉사 시간</Txt>
        <Input
          type='number'
          placeholder='최대 12시간'
          max={12}
          className='placeholder:text-Icon-Detail h-[43px] w-full px-5 text-lg'
        />
      </div>

      {/* 정원 */}
      <div>
        <Txt className='block pb-2 text-xl'>정원</Txt>
        <Input
          type='number'
          placeholder='모집 정원 입력'
          required
          min={1}
          className='placeholder:text-Icon-Detail h-[43px] w-full px-5 text-lg'
        />
      </div>

      {/* 모집 마감일 */}
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
    </div>
  );
}
