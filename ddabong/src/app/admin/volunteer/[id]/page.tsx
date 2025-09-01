import UserInfo from '@/components/admin/volunteer/UserInfo';
import UserReviewList from '@/components/admin/volunteer/UserReviewList';
import UserReviewStarRating from '@/components/admin/volunteer/UserReviewStarRating';
import TopBar from '@/components/atoms/TopBar';

const reviews = [
  {
    id: 1,
    title: '미녀들이랑 노는 봉사',
    category: '농어촌',
    endDate: '2025.09.01',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/미녀들.jpg',
    totalRate: 4.0,
    diligenceLevel: 4.0,
    attitude: 4.0,
    healthStatus: 3.3,
    content:
      '열정적으로 참여해 주셔서 현장 분위기가 활기찼습니다. 뿡뽕빵다리빵삥',
  },
  {
    id: 2,
    title: '자만언니 깨우기 봉사',
    category: '환경',
    endDate: '2025.09.08',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/자마니깨우기.jpg',
    totalRate: 5.0,
    diligenceLevel: 5.0,
    attitude: 5.0,
    healthStatus: 5.0,
    content:
      '짧은 시간이었지만 함께해주셔서 큰 힘이 됐습니다. 감사합니다람쥐쥐쥐지엘지우승축하요',
  },
];
export default function VolunteerListDetailPage() {
  return (
    <div>
      <TopBar title='프로필'></TopBar>
      <UserInfo
        userName='초수비'
        birthDate='1965.09.05'
        phoneNumber='010-4113-9361'
        profileImage='https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg'
        preferredCategory='농어촌'
        aiReview='피그마를 잘해요. 마라샹궈를 좋아해요'
      />
      <UserReviewStarRating
        totalRate={4.0}
        diligenceLevel={4.0}
        healthStatus={4.0}
        attitude={4.0}
      />

      <UserReviewList count={3} userName='초수비' reviews={reviews} />
    </div>
  );
}
