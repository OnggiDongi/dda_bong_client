// (특정 봉사) 지원자 목록
import ActivityReview from '@/components/ActivityReview';
import ActivityApplyInfo from '@/components/admin/volunteer/ActivityApplyInfo';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

type Review = {
  id: number;
  userName: string;
  imageUrl: string;
  totalRate: number | null;
  diligenceLevel: number | null;
  attitude: number | null;
  healthStatus: number | null;
  status: string;
  aiReview: string | null;
};

const reviews: Review[] = [
  {
    id: 1,
    userName: '초수비',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg',
    totalRate: 4.0,
    diligenceLevel: 4.0,
    attitude: 4.0,
    healthStatus: 4.0,
    status: 'PENDING',
    aiReview: '피그마를 잘해요. 마라샹궈를 좋아해요. 야미야미 맛있거등여 냠',
  },
  {
    id: 2,
    userName: '김보개미',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김보개미.png',
    totalRate: 1.2,
    diligenceLevel: 1.0,
    attitude: 1.0,
    healthStatus: 1.0,
    status: 'REJECTED',
    aiReview: '다리가 불편해보여요. 정신 사나워요. 물릴 수 있으니 조심!',
  },
  {
    id: 3,
    userName: '이짐',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg',
    totalRate: 4.5,
    diligenceLevel: 4.0,
    attitude: 5.0,
    healthStatus: 5.0,
    status: 'APPROVED',
    aiReview: '짐이 많아요. 우산 키링을 좋아해요. 볼링을 잘쳐요 스트라이크~!',
  },
  {
    id: 4,
    userName: '기여니피그',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김태희.png',
    totalRate: 5.0,
    diligenceLevel: 5.0,
    attitude: 5.0,
    healthStatus: 5.0,
    status: 'PENDING',
    aiReview:
      '외계어를 해요. 4차원이에요. 꾸잉꾸잉삐요 소리를 내고 안경을 써요.',
  },
  {
    id: 5,
    userName: '비버',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/비버.png',
    totalRate: null,
    diligenceLevel: null,
    attitude: null,
    healthStatus: null,
    status: 'PENDING',
    aiReview: null,
  },
];

export default function VolunteerListPage() {
  return (
    <>
      <div className='flex flex-col'>
        <TopBar title='지원자 목록'></TopBar>
        <ActivityApplyInfo
          title='미녀들이랑 노는 봉사'
          endDate='2025.09.01'
          category='농어촌'
          imageUrl='https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/미녀들.jpg'
          recruitNum={10}
          applicantsNum={8}
        />
        <div>
          {reviews.length != 0 ? (
            reviews.map((user) => (
              <ActivityReview
                key={user.id}
                userName={user.userName}
                imageUrl={user.imageUrl}
                totalRate={user.totalRate}
                diligenceLevel={user.diligenceLevel}
                attitude={user.attitude}
                healthStatus={user.healthStatus}
                status={user.status}
                aiReview={user.aiReview}
              />
            ))
          ) : (
            <div className='mt-1 flex min-h-[64vh] flex-col items-center justify-center bg-white'>
              <Txt weight='medium' className='text-Modal-font'>
                글이 없습니다.
              </Txt>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
