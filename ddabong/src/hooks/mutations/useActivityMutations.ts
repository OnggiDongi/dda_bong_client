import { useToast } from '@/contexts/toast/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateClient as client } from '@/lib/openapi-client';
import { DetailedActivityPost } from '@/app/apply/[id]/page';
import { components } from '@/types/openapi';

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

export const useDeleteActivityMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (id: number) =>
      client.DELETE('/posts/{id}', {
        params: { path: { id } },
      }),
    onSuccess: () => {
      showToast('게시물이 삭제되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: ['activityPost'] });
    },
    onError: (err: Error) => {
      showToast(err.message || '삭제에 실패했습니다.', 'error');
    },
  });
};

export const useUpdateActivityMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (updatedData: components["schemas"]["ActivityUpdateDTO"]) =>
      client.PATCH('/activity', {
        body: updatedData,
      }),
    onSuccess: (data, variables) => {
      showToast('게시물이 수정되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: ['activityPost', variables.id] });
    },
    onError: (err: Error) => {
      showToast(err.message || '수정에 실패했습니다.', 'error');
    },
  });
};

export const useUpdateActivityPostMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & components["schemas"]["ActivityPostRequestDTO"]) =>
      client.PATCH('/posts/{id}', {
        params: { path: { id } },
        body: data,
      }),
    onSuccess: (data, variables) => {
      showToast('게시물이 수정되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: ['activityPost', variables.id] });
    },
    onError: (err: Error) => {
      showToast(err.message || '수정에 실패했습니다.', 'error');
    },
  });
};
