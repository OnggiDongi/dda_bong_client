'use client';

import Txt from '@/components/atoms/Text';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function Category() {
  return (
    <div className='pt-[10px]'>
      <Txt weight='bold' className='text-Hana-Black pt-6 pl-[30px] text-xl'>
        봉사 카테고리
      </Txt>

      <div className='mt-3 px-[26px]'>
        <Select onValueChange={(v) => console.log('selected:', v)}>
          <SelectTrigger>
            <SelectValue placeholder='카테고리' />
          </SelectTrigger>

          <SelectContent className='rounded-xl text-base text-Hana-Black'>
            <SelectItem className='py-3' value='환경'>
              환경
            </SelectItem>
            <SelectItem className='py-3' value='교육'>
              교육
            </SelectItem>
            <SelectItem className='py-3' value='돌봄'>
              돌봄
            </SelectItem>
            <SelectItem className='py-3' value='행정지원'>
              행정지원
            </SelectItem>
            <SelectItem className='py-3' value='기타'>
              기타
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
