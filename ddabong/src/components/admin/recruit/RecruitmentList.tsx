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

export default function RecruitmentList({
  recruitments,
  selectedId,
  onSelectRecruitment,
}: RecruitmentListProps) {
  return (
    <>
      <div className='mt-[15px] flex justify-center'>
        <Txt weight='semibold' className='text-Logo-Mint text-lg'>
          원하는 봉사 선택 후 모집 글을 작성하세요!
        </Txt>
      </div>
      <div className='flex flex-col items-center py-[22px]'>
        <Link href='/admin/register' passHref>
          <Button
            className='bg-1Q-Mint-Line border-Logo-Mint/45 h-[42px] w-[350px] rounded-[20px] border'
            textClassName='text-Logo-Mint text-lg'
          >
            추가하기
          </Button>
        </Link>
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
            <div className='mb-3 flex items-center gap-2'>
              <Badge
                text={recruitment.category}
                className='h-[25px] w-[60px] rounded-[15px] text-center text-base'
              />
              <Txt className='pb-0.5 pl-1 text-lg'>{recruitment.title}</Txt>
            </div>
            <Txt className='text-Icon-Detail text-base'>
              {recruitment.content}
            </Txt>
          </div>
        ))}
      </div>
    </>
  );
}
