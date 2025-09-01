import ApplyBody from '@/components/apply/ApplyBody';
import ApplyFooter from '@/components/apply/ApplyFooter';
import ApplyHeader from '@/components/apply/ApplyHeader';
import ApplyReview from '@/components/apply/review/ApplyReview';

export type Review = {
  id: number;
  userName: string;
  imageUrl: string;
  rate: number;
  content: string;
};

const reviews: Review[] = [
  {
    id: 1,
    userName: '초수비',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg',
    rate: 4.0,
    content: '피그마를 잘해요. 마라샹궈를 좋아해요.',
  },
  {
    id: 2,
    userName: '김보개미',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김보개미.png',
    rate: 1.2,
    content: '다리가 불편해보여요. 정신 사나워요.',
  },
  {
    id: 3,
    userName: '이짐',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/이짐.png',
    rate: 4.5,
    content: '짐이 많아요. 우산 키링을 좋아해요.',
  },
  {
    id: 4,
    userName: '기여니피그',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김태희.png',
    rate: 5.0,
    content: '외계어를 해요. 4차원이에요.',
  },
  {
    id: 5,
    userName: '비버',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/비버.png',
    rate: 4.9,
    content:
      '밥을 많이 안주면 물어요. 소리를 질러요. 밥을 많이 안주면 물어요. 소리를 질러요. 밥을 많이 안주면 물어요. 소리를 질러요. 밥을 많이 안주면 물어요. 소리를 질러요. 밥을 많이 안주면 물어요. 소리를 질러요.',
  },
];

export default async function VolunteerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className='flex h-dvh flex-col bg-white'>
      <ApplyHeader />
      <div className='flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <ApplyBody />
        <ApplyReview reviews={reviews} />
      </div>
      <ApplyFooter isApply={true} />
    </main>
  );
}
