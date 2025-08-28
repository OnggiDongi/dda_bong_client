import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';
import { cn } from '@/lib/utils';

export type RecruitmentStatus = 'recruiting' | 'finished';

export interface RecruitmentPost {
  id: number;
  title: string;
  status: RecruitmentStatus;
  applicants: number;
  capacity: number;
}

interface RecruitmentCardProps {
  post: RecruitmentPost;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function RecruitmentCard({ post, onEdit, onDelete }: RecruitmentCardProps) {
  const { id, title, status, applicants, capacity } = post;
  const isRecruiting = status === 'recruiting';

  return (
    <div className='w-full rounded-lg bg-white p-4 shadow-md'>
      <div className='flex items-center justify-between'>
        <Txt weight='bold' className='text-lg'>
          {title}
        </Txt>
        <div
          className={cn(
            'rounded-full px-3 py-1 text-sm text-white',
            isRecruiting ? 'bg-Hana-Green' : 'bg-gray-400'
          )}
        >
          {isRecruiting ? '모집중' : '모집완료'}
        </div>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <Txt className='text-gray-600'>
          신청 {applicants} / {capacity} 명
        </Txt>
        <div className='flex gap-2'>
          <Button
            color='white'
            borderColor='mint'
            className='h-8 w-16 text-sm text-Hana-Green'
            onClick={() => onEdit(id)}
          >
            수정
          </Button>
          <Button
            color='white'
            borderColor='pink'
            className='h-8 w-16 text-sm text-Logo-Pink'
            onClick={() => onDelete(id)}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
