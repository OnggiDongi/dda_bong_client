'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { REGION_MAP } from './data/region';

export default function LocationFilter() {
  const [region, setRegion] = useState<string | undefined>(undefined);
  const [district, setDistrict] = useState<string | undefined>(undefined);

  return (
    <div className='flex gap-2'>
      <Select value={region} onValueChange={setRegion}>
        <SelectTrigger className='text-Icon-Detail border-Box-Line !h-[43px] w-[170px] rounded-xl border bg-white py-[11px] font-[AppleSDGothicNeoM00] text-xl'>
          <SelectValue
            placeholder='시/도 선택'
            className='text-Icon-Detail font-[AppleSDGothicNeoM00]'
          />
        </SelectTrigger>
        <SelectContent className='text-Icon-Detail rounded-xl text-xl [&_[data-radix-select-viewport]]:max-h-60 [&_[data-radix-select-viewport]]:overflow-y-auto'>
          {Object.keys(REGION_MAP).map((r) => (
            <SelectItem key={r} value={r} className='text-Icon-Detail text-xl'>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={district} onValueChange={setDistrict}>
        <SelectTrigger className='text-Icon-Detail border-Box-Line !h-[43px] w-[170px] rounded-xl border bg-white py-[11px] font-[AppleSDGothicNeoM00] text-xl'>
          <SelectValue
            placeholder='구/군 선택'
            className='text-Icon-Detail font-[AppleSDGothicNeoM00]'
          />
        </SelectTrigger>
        <SelectContent className='text-Icon-Detail rounded-xl text-xl'>
          {region &&
            REGION_MAP[region].map((d) => (
              <SelectItem
                key={d}
                value={d}
                className='text-Icon-Detail text-xl'
              >
                {d}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
