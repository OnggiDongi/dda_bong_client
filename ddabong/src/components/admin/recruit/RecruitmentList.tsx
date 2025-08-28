'use client';

import Link from 'next/link';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';

interface Recruitment {
  id: number;
  category: string;
  title: string;
  content: string;
}

interface RecruitmentListProps {
  recruitments: Recruitment[];
  selectedId: number | null;
  onSelectRecruitment: (id: number) => void;
}

export default function RecruitmentList({ recruitments, selectedId, onSelectRecruitment }: RecruitmentListProps) {
  return (
    <>
      <div className='mt-[54px] mb-[52px] flex justify-center'>
        <Txt weight='semibold' className='text-Hana-Black text-lg'>
          원하는 봉사를 선택 후 모집 글을 작성하세요.
        </Txt>
      </div>
      <div className='flex flex-col items-center space-y-[15px]'>
        {recruitments.map((recruitment) => (
          <div
            key={recruitment.id}
            className={`h-[100px] w-[350px] cursor-pointer rounded-[15px] border bg-white pt-[15px] pb-[15px] pl-[30px] ${
              selectedId === recruitment.id
                ? 'border-Logo-Mint'
                : 'border-transparent'
            }`}
            onClick={() => onSelectRecruitment(recruitment.id)}
          >
            <div className='mb-2 flex items-center gap-2'>
              <Badge
                text={recruitment.category}
                className='text-Hana-Black h-[25px] w-[60px] rounded-[15px] text-center text-base'
              />
              <Txt
                weight='semibold'
                className='text-Hana-Black pl-[7px] text-lg'
              >
                {recruitment.title}
              </Txt>
            </div>
            <Txt weight='semibold' className='text-Icon-Detail text-base'>
              {recruitment.content}
            </Txt>
          </div>
        ))}
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <Link href='/admin/recruit/write' passHref>
          <Button
            className='h-[42px] w-[350px] rounded-[20px] bg-white'
            textClassName='text-Hana-Black text-lg'
          >
            추가하기
          </Button>
        </Link>
      </div>
    </>
  );
}
