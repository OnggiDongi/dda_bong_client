import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';

const CATEGORY_REVERSE_MAP: { [key: string]: string } = {
  LIVING: '생활',
  EDUCATION: '교육',
  SAFETY: '보건',
  CULTURE: '문화',
  ENVIRONMENT: '환경',
  PUBLIC: '행정',
  RURALAREA: '농어촌',
};

type Props = {
  id: number | string;
  category: string;
  deadline: string;
  title: string;
  date: string;
  location: string;
  image: string;
};

const formatDeadline = (dday: string) => {
  if (dday && dday.toUpperCase().startsWith('D-')) {
    const daysLeft = dday.substring(2);
    return `마감 ${daysLeft}일 남음`;
  }
  return dday; // Fallback to original string if format is unexpected
};

export default function VolunteerCard({
  id,
  category,
  deadline,
  title,
  date,
  location,
  image,
}: Props) {
  const koreanCategory = CATEGORY_REVERSE_MAP[category] || category;
  const formattedDeadline = formatDeadline(deadline);

  return (
    <Link href={`/apply/${id}`}>
      <div className='flex gap-3 rounded-2xl bg-white p-4'>
        <Image
          src={image}
          alt={title}
          width={120}
          height={120}
          className='h-[120px] w-[120px] rounded-xl object-cover'
        />
        <div className='flex flex-col justify-between'>
          <div className='flex gap-1'>
            <Badge text={koreanCategory} />
            <Badge
              text={formattedDeadline}
              bgColor='bg-white'
              borderColor='border-Logo-Mint'
              textColor='text-Logo-Mint'
            />
          </div>
          <Txt className='text-Hana-Black w-[190px] truncate text-lg'>
            {title}
          </Txt>
          <Txt className='text-Icon-Detail -mt-1 text-base'>{date}</Txt>
          <Txt className='text-Icon-Detail -mt-2 text-base'>{location}</Txt>
        </div>
      </div>
    </Link>
  );
}
