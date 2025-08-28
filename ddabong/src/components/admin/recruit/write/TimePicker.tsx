'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TimePicker() {
  const [ampm, setAmpm] = useState<string>();
  const [hour, setHour] = useState<string>();
  const [minute, setMinute] = useState<string>();

  return (
    <div className='flex gap-2'>
      <Select value={ampm} onValueChange={setAmpm}>
        <SelectTrigger className='border-Box-Linedata-[placeholder]:text-Logo-mint text-Hana-Black !h-[43px] flex-1 rounded-xl border bg-white text-lg'>
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

      <Select value={hour} onValueChange={setHour}>
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

      <Select value={minute} onValueChange={setMinute}>
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
