'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type TimeValue = {
  ampm?: string;
  hour?: string;
  minute?: string;
};

interface TimePickerProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
}

export default function TimePicker({ value, onChange }: TimePickerProps) {
  const handleAmpmChange = (newAmpm: string) => {
    onChange({ ...value, ampm: newAmpm });
  };

  const handleHourChange = (newHour: string) => {
    onChange({ ...value, hour: newHour });
  };

  const handleMinuteChange = (newMinute: string) => {
    onChange({ ...value, minute: newMinute });
  };

  return (
    <div className='flex gap-2'>
      <Select value={value.ampm} onValueChange={handleAmpmChange}>
        <SelectTrigger className='border-Box-Line text-Hana-Black !h-[43px] flex-1 rounded-xl border bg-white text-lg'>
          <SelectValue
            placeholder='오전/오후'
            className='p-2 font-[AppleSDGothicNeoM00] text-lg'
          />
        </SelectTrigger>
        <SelectContent className='rounded-xl'>
          <SelectItem value='AM'>오전</SelectItem>
          <SelectItem value='PM'>오후</SelectItem>
        </SelectContent>
      </Select>

      <Select value={value.hour} onValueChange={handleHourChange}>
        <SelectTrigger className='border-Box-Line text-Hana-Black !h-[43px] flex-1 rounded-xl border bg-white text-lg'>
          <SelectValue
            placeholder='시'
            className='text-Icon-Detail p-2 font-[AppleSDGothicNeoM00] text-lg'
          />
        </SelectTrigger>
        <SelectContent className='rounded-xl'>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i + 1} value={String(i + 1)}>
              {i + 1}시
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={value.minute} onValueChange={handleMinuteChange}>
        <SelectTrigger className='border-Box-Line text-Hana-Black !h-[43px] flex-1 rounded-xl border bg-white text-lg'>
          <SelectValue
            placeholder='분'
            className='text-Icon-Detail p-2 font-[AppleSDGothicNeoM00] text-lg'
          />
        </SelectTrigger>
        <SelectContent className='rounded-xl'>
          {['00', '30'].map((m) => (
            <SelectItem key={m} value={m}>
              {m}분
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
