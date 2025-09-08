export type ApplicantReview = {
  id: number;
  userId: number;
  name: string;
  profileImage: string;
  rate: number;
  healthStatus: number;
  diligenceLevel: number;
  attitude: number;
  aiComment: string;
  status: string;
};

export type ApplicantList = {
  category: string;
  title: string;
  endAt: string;
  imageUrl: string;
  applicantNum: number;
  capacity: number;
  reviews: ApplicantReview[];
};
