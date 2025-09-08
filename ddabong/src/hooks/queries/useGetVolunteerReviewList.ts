import { ApplicantList } from '@/types/review';
import { useSuspenseQuery } from '@tanstack/react-query';
import { privateClient } from '@/lib/openapi-client';

export const getVolunteerReviewList = async (boardId: number) => {
  const response = await privateClient.GET('/posts/apply/{activityPostId}', {
    params: {
      path: {
        activityPostId: boardId,
      },
    },
  });

  if (!response.response.ok) {
    throw new Error('Failed to fetch volunteer review list');
  }

  if (!response.data) {
    throw new Error('No data returned from volunteer review list');
  }

  return response.data as ApplicantList;
};

export const useGetVolunteerReviewList = (boardId: number) => {
  return useSuspenseQuery({
    queryKey: ['volunteerReviewList', boardId],
    queryFn: () => getVolunteerReviewList(boardId),
    select: (data) => ({
      title: data.title,
      endDate: data.endAt,
      category: data.category,
      imageUrl: data.imageUrl,
      recruitNum: data.capacity,
      applicantsNum: data.applicantNum,
      volunteerList: data.reviews.map((review) => ({
        userId: review.userId,
        userName: review.name,
        imageUrl: review.profileImage,
        totalRate: review.rate,
        diligenceLevel: review.diligenceLevel,
        attitude: review.attitude,
        healthStatus: review.healthStatus,
        hasMyReview: review.status !== 'PENDING',
        aiReview: review.aiComment,
      })),
    }),
  });
};
