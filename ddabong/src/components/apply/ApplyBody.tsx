import { DetailedActivityPost } from '@/app/apply/[id]/page';
import Badge from '../atoms/Badge';
import Txt from '../atoms/Text';
import ApplyGridBox from './ApplyGridBox';

type ApplyBodyProps = {
  post: DetailedActivityPost;
};

export default function ApplyBody({ post }: ApplyBodyProps) {
  const formatDeadline = (dday: string) => {
    if (dday && dday.toUpperCase().startsWith('D-')) {
      const daysLeft = dday.substring(2);
      return `마감 ${daysLeft}일 남음`;
    }
    return dday; // Fallback to original string if format is unexpected
  };

  const isRecruitmentClosed = () => {
    if (post.dday === 'D-DAY' || post.dday === 'D-0') {
      return false;
    }
    if (post.dday.startsWith('D-')) {
      return false;
    }
    return true;
  };

  const recruitmentClosed = isRecruitmentClosed();

  return (
    <section className='relative flex w-full flex-col'>
      {post.imageUrl && (
        <img
          className='h-[334px] w-full object-cover'
          src={post.imageUrl}
          alt={post.title}
        />
      )}
      <div className='px-4'>
        <div className='mt-[21px] mb-[10px] flex gap-1'>
          {post.category && <Badge text={post.category} />}
          {post.dday && (
            <Badge
              text={recruitmentClosed ? '모집 마감' : formatDeadline(post.dday)}
              bgColor='bg-white'
              textColor={recruitmentClosed ? 'text-red-500' : 'text-Logo-Mint'}
              borderColor={
                recruitmentClosed ? 'border-red-500' : 'border-Logo-Mint'
              }
            />
          )}
        </div>
        <Txt className='text-[22px]' weight='bold'>
          {post.title}
        </Txt>
        <div className='mt-[21px] grid grid-cols-2 gap-x-1 gap-y-7'>
          <ApplyGridBox
            iconSrc='/icons/ic_home.svg'
            iconAlt='home icon'
            lines={[post.institutionName, post.institutionPhoneNumber]}
          />
          <ApplyGridBox
            iconSrc='/icons/ic_location.svg'
            iconAlt='location icon'
            lines={[post.location]}
          />
          <ApplyGridBox
            iconSrc='/icons/ic_capacity.svg'
            iconAlt='capacity icon'
            lines={['모집인원', `${post.capacity}명`]}
          />
          <ApplyGridBox
            iconSrc='/icons/ic_date.svg'
            iconAlt='date icon'
            lines={[post.date, post.time]}
          />
        </div>
        <div className='my-5 h-[1px] w-full bg-gray-200'></div>
        <Txt className='text-[20px] whitespace-pre-wrap' weight='medium'>
          {post.content}
        </Txt>
        <div className='my-5 h-[1px] w-full bg-gray-200'></div>
      </div>
    </section>
  );
}
