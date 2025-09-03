import { useToast } from '@/contexts/toast/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateClient as client } from '@/lib/openapi-client';
import { DetailedActivityPost } from '@/app/apply/[id]/page';

export const useLikeActivityMutation = (
  postId: number,
  queryKey: (string | number)[]
) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: () =>
      client.POST('/posts/{activityPostId}/like', {
        params: { path: { activityPostId: postId } },
      }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousPost =
        queryClient.getQueryData<DetailedActivityPost>(queryKey);
      if (previousPost) {
        queryClient.setQueryData(queryKey, {
          ...previousPost,
          isLiked: !previousPost.isLiked,
        });
      }
      return { previousPost };
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(queryKey, context.previousPost);
      }
      showToast(
        '찜 상태 변경에 실패했습니다. 로그인 상태를 확인해주세요.',
        'error'
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/users/likes'] });
    },
  });
};

// Custom hook for the apply mutation
export const useApplyActivityMutation = (
  postId: number,
  queryKey: (string | number)[]
) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: () =>
      client.POST('/posts/{activityPostId}/apply', {
        params: { path: { activityPostId: postId } },
      }),
    onSuccess: () => {
      queryClient.setQueryData<DetailedActivityPost | undefined>(
        queryKey,
        (oldData) => (oldData ? { ...oldData, isApplied: true } : undefined)
      );
      showToast('봉사활동 신청이 완료되었습니다.', 'success');
    },
    onError: (err: Error) => {
      showToast(
        err.message ||
          '봉사활동 신청에 실패했습니다. 로그인 상태를 확인해주세요.',
        'error'
      );
    },
  });
};
