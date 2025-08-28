'use client';

import * as React from 'react';
import Txt from '@/components/atoms/Text';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const CATEGORIES = [
  '생활',
  '교육',
  '보건',
  '문화',
  '환경',
  '행정',
  '농어촌',
] as const;

export default function Category() {
  return (
    <div className='pt-[10px]'>
      <Txt weight='bold' className='pt-6 pl-[30px] text-xl'>
        봉사 카테고리
      </Txt>

      <div className='mt-3 px-[26px]'>
        <Select onValueChange={(v) => console.log('selected:', v)}>
          <SelectTrigger>
            <SelectValue placeholder='카테고리' />
          </SelectTrigger>

          <SelectContent className='text-Hana-Black rounded-xl text-base'>
            {CATEGORIES.map((cate) => (
              <SelectItem key={cate} className='py-3' value={cate}>
                {cate}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
