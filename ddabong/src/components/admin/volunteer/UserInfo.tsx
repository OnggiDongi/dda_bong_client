import Image from 'next/image';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';

type Props = {
  userName: string;
  birthDate: string;
  phoneNumber: string;
  profileImage: string;
  preferredCategory: string;
};
export default function UserInfo({
  userName,
  birthDate,
  phoneNumber,
  profileImage,
  preferredCategory,
}: Props) {
  return (
    <>
      <div className='mt-1 flex flex-col items-center bg-white px-8 pt-8'>
        <div className='flex w-full gap-4 overflow-hidden pb-8'>
          <Image
            src={profileImage}
            alt='user_profile_image'
            width={86}
            height={86}
            className='h-[86px] w-[86px] rounded-full border border-gray-200 object-cover'
          />
          <div className='flex flex-1 flex-col justify-center'>
            <div className='flex w-full justify-between'>
              <Txt weight='bold' className='text-lg'>
                {userName}
              </Txt>
              <Badge text={preferredCategory} />
            </div>
            <Txt className='text-Modal-font'>{birthDate}</Txt>
            <Txt className='text-Modal-font'>{phoneNumber}</Txt>
          </div>
        </div>
      </div>
    </>
  );
}
