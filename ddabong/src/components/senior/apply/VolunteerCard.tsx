import Image from 'next/image';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';

type Props = {
  category: string;
  deadline: string;
  title: string;
  date: string;
  location: string;
  image: string;
};

export default function VolunteerCard({
  category,
  deadline,
  title,
  date,
  location,
  image,
}: Props) {
  return (
    <div className='px- flex gap-3 rounded-2xl bg-white p-4'>
      <Image
        src={image}
        alt={title}
        width={120}
        height={120}
        className='h-[120px] w-[120px] rounded-xl object-cover'
      />
      <div className='flex flex-col justify-between pl-2'>
        <div className='flex gap-1'>
          <Badge text={category} />
          <Badge
            text={deadline}
            bgColor='bg-white'
            borderColor='border-Logo-Mint'
            textColor='text-Logo-Mint'
          />
        </div>
        <Txt
          weight='semibold'
          className='text-Hana-Black w-[200px] truncate text-lg'
        >
          {title}
        </Txt>
        <Txt className='text-Icon-Detail text-base'>{date}</Txt>
        <Txt className='text-Icon-Detail -mt-1.5 text-base'>{location}</Txt>
      </div>
    </div>
  );
}
