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
  },
  {
    id: 2,
    title: '자만언니 깨우기 봉사',
    category: '환경',
    endDate: '2025.09.08',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/자마니깨우기.jpg',
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
