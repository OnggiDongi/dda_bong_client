import ActivityReview from '@/components/ActivityReview';
import ActivityApplyInfo from '@/components/admin/volunteer/ActivityApplyInfo';
import TopBar from '@/components/atoms/TopBar';

const userProfileImage =
  'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-08-29+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+9.58.48.png';
const reviews = [
  {
    userName: '초수비',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg',
    totalRate: 4.0,
    diligenceLevel: 4.0,
    attitude: 4.0,
    healthStatus: 4.0,
    status: 'PENDING',
    aiReview: '피그마를 잘해요. 마라샹궈를 좋아해요.',
  },
  {
    userName: '김보개미',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김보개미.png',
    totalRate: 1.2,
    diligenceLevel: 1.0,
    attitude: 1.0,
    healthStatus: 1.0,
    status: 'REJECTED',
    aiReview: '다리가 불편해보여요. 정신 사나워요.',
  },
  {
    userName: '이짐',
    imageUrl: userProfileImage,
    totalRate: 4.5,
    diligenceLevel: 4.0,
    attitude: 5.0,
    healthStatus: 5.0,
    status: 'APPROVED',
    aiReview: '짐이 많아요. 우산 키링을 좋아해요.',
  },
  {
    userName: '기여니피그',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김태희.png',
    totalRate: 5.0,
    diligenceLevel: 5.0,
    attitude: 5.0,
    healthStatus: 5.0,
    status: 'PENDING',
    aiReview: '외계어를 해요. 4차원이에요.',
  },
  {
    userName: '비버',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/비버.png',
    totalRate: 4.9,
    diligenceLevel: 5.0,
    attitude: 5.0,
    healthStatus: 4.7,
    status: 'PENDING',
    aiReview: '밥을 많이 안주면 물어요. 소리를 질러..',
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
          {reviews.map((user) => (
            <ActivityReview
              key={user.userName}
              userName={user.userName}
              imageUrl={user.imageUrl}
              totalRate={user.totalRate}
              diligenceLevel={user.diligenceLevel}
              attitude={user.attitude}
              healthStatus={user.healthStatus}
              status={user.status}
              aiReview={user.aiReview}
            />
          ))}
        </div>
      </div>
    </>
  );
}
