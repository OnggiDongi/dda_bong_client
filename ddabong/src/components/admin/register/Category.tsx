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

          <SelectContent className='text-Hana-Black rounded-xl text-base'>
            <SelectItem className='py-3' value='생활'>
              생활
            </SelectItem>
            <SelectItem className='py-3' value='교육'>
              교육
            </SelectItem>
            <SelectItem className='py-3' value='보건'>
              보건
            </SelectItem>
            <SelectItem className='py-3' value='문화'>
              문화
            </SelectItem>
            <SelectItem className='py-3' value='환경'>
              환경
            </SelectItem>
            <SelectItem className='py-3' value='행정'>
              행정
            </SelectItem>
            <SelectItem className='py-3' value='농어촌'>
              농어촌
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
