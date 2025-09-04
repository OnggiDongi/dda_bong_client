'use client';

import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { components } from '@/types/openapi';

type ActivityCategory = components['schemas']['ActivityRequestDTO']['category'];

const CATEGORY_MAP: Record<ActivityCategory, string> = {
  LIVING: '생활',
  EDUCATION: '교육',
  SAFETY: '보건',
  CULTURE: '문화',
  ENVIRONMENT: '환경',
  PUBLIC: '행정',
  RURALAREA: '농어촌',
};

const CATEGORIES = Object.keys(CATEGORY_MAP) as ActivityCategory[];

interface CategoryProps {
  value: ActivityCategory;
  onValueChange: (value: ActivityCategory) => void;
}

export default function AdminCategory({ value, onValueChange }: CategoryProps) {
  return (
    <div className='pt-[10px]'>
      <div>
        <Select
          onValueChange={onValueChange}
          value={value}
        >
          <SelectTrigger>
            <SelectValue placeholder='카테고리' />
          </SelectTrigger>

          <SelectContent className='text-Hana-Black rounded-xl text-base'>
            {CATEGORIES.map((cate) => (
              <SelectItem key={cate} className='py-3' value={cate}>
                {CATEGORY_MAP[cate]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
