import Image from 'next/image';
import AiComment from '@/components/atoms/AiComment';
import Badge from '@/components/atoms/Badge';
import Txt from '@/components/atoms/Text';

type Props = {
  userName: string;
  birthDate: string;
  phoneNumber: string;
  profileImage: string;
  preferredCategory: string;
  aiReviw: string;
};
export default function UserInfo({
  userName,
  birthDate,
  phoneNumber,
  profileImage,
  preferredCategory,
  aiReviw,
}: Props) {
  console.log(userName);
  return (
    <>
      <div className='mt-1 flex flex-col items-center bg-white px-8 py-8'>
        <div className='flex w-full gap-4 overflow-hidden pb-8'>
          <Image
            src={profileImage}
            alt='user_profile_image'
            width={100}
            height={100}
            className='rounded-full border border-gray-200 object-cover'
          />
          <div className='flex flex-1 flex-col justify-center'>
            <div className='flex w-full justify-between'>
              <Txt>{userName}</Txt>
              <Badge text={preferredCategory} />
            </div>
            <Txt>{birthDate}</Txt>
            <Txt>{phoneNumber}</Txt>
          </div>
        </div>
        <AiComment text={aiReviw} />
      </div>
    </>
  );
}
