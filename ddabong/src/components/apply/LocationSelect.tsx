'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Txt from '../atoms/Text';
import { REGION_MAP } from './data/region';

interface LocationSelectProps {
  region: string | undefined;
  district: string | undefined;
  onRegionChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
}

export default function LocationSelect({ 
  region, 
  district, 
  onRegionChange, 
  onDistrictChange 
}: LocationSelectProps) {

  const handleRegionChange = (value: string) => {
    onRegionChange(value);
    onDistrictChange(undefined as any); // Reset district when region changes
  }

  return (
    <div className='flex gap-2'>
      <Select value={region} onValueChange={handleRegionChange}>
        <SelectTrigger className='text-Hana-Black text-xl'>
          <SelectValue
            placeholder={
              <Txt weight='medium' className='text-Icon-Detail text-xl'>
                시/도 선택
              </Txt>
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

      <Select value={district} onValueChange={onDistrictChange}>
        <SelectTrigger className='text-Hana-Black text-xl' disabled={!region}>
          <SelectValue
            placeholder={
              <Txt weight='medium' className='text-Icon-Detail text-xl'>
                구/군 선택
              </Txt>
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