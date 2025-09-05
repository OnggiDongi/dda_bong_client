import { UseAxiosWithAuth } from './useAxiosWithAuth';

type Preview = { url: string; file: File };

export const userReviewIO = async (
  activityPostId: number,
  userRating: number,
  review: string,
  photo?: Preview
) => {
  try {
    const axiosAuth = UseAxiosWithAuth();
    let imageUrl: string | undefined;
    const formData = new FormData();

    // 사진이 있으면 업로드
    if (photo) {
      formData.append('file', photo.file);
      const fileRes = await axiosAuth.post(`/upload`, formData);

      if (fileRes.data?.error) {
        return 'errPhoto';
      }
      imageUrl = fileRes.data;
    }

    // 후기 작성
    const res = await axiosAuth.post(`/activity/${activityPostId}/review`, {
      rate: userRating,
      content: review,
      imageUrl,
    });
    if (res.data?.error) {
      return 'errReview';
    }
    return 'ok';
  } catch {
    return 'err';
  }
};

export const adminReviewIO = async (
  activityPostId: number,
  healthStatus: number,
  diligenceLevel: number,
  attitude: number,
  memo: string,
  userId: number
) => {
  try {
    const axiosAuth = UseAxiosWithAuth();
    const res = await axiosAuth.post(`/users/${userId}/reviews`, {
      activityPostId,
      healthStatus,
      diligenceLevel,
      attitude,
      memo,
    });
    if (res.data?.error) {
      return 'errReview';
    }
    return 'ok';
  } catch {
    return 'err';
  }
};
