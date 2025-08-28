'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Txt from '../atoms/Text';
import { REGION_MAP } from './data/region';

export default function LocationFilter() {
  const [region, setRegion] = useState<string | undefined>(undefined);
  const [district, setDistrict] = useState<string | undefined>(undefined);

  return (
    <div className='flex gap-2'>
      <Select value={region} onValueChange={setRegion}>
        <SelectTrigger className='text-Icon-Detail text-xl'>
          <SelectValue
            placeholder={
              <Txt className='text-Icon-Detail text-xl'>시/도 선택</Txt>
            }
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
        <SelectTrigger className='text-Icon-Detail text-xl'>
          <SelectValue
            placeholder={
              <Txt className='text-Icon-Detail text-xl'>구/군 선택</Txt>
            }
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
