import { useToast } from '@/contexts/toast/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateClient as client } from '@/lib/openapi-client';
import type { DetailedActivityPost } from '@/types/activity';
import type { components } from '@/types/openapi';

type ActivityRequestDTO = components['schemas']['ActivityRequestDTO'];

export const useCreateActivityMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (body: ActivityRequestDTO) =>
      client.POST('/activity', {
        body,
      }),
    onSuccess: () => {
      showToast('봉사가 추가되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: ['/activity'] });
    },
    onError: (err: Error) => {
      showToast(err.message || '봉사 추가에 실패했습니다.', 'error');
    },
  });
};

export const useLikeActivityMutation = (
  postId: number,
  queryKey: (string | number)[]
) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  type QueryData = DetailedActivityPost & { isLiked?: boolean; isApplied?: boolean };

  return useMutation({
    mutationFn: () =>
      client.POST('/posts/{activityPostId}/like', {
        params: { path: { activityPostId: postId } },
      }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousPost = queryClient.getQueryData<QueryData>(queryKey);

      if (previousPost) {
        queryClient.setQueryData<QueryData>(queryKey, {
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
      queryClient.setQueryData<
        (DetailedActivityPost & { isLiked?: boolean; isApplied?: boolean }) | undefined
      >(queryKey, (oldData) =>
        oldData ? { ...oldData, isApplied: true } : undefined
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
      console.error('Delete failed:', err);
      showToast(err.message || '삭제에 실패했습니다. 자세한 내용은 콘솔을 확인해주세요.', 'error');
    },
  });
};

// Define a specific type for the mutation variables to avoid 'any'
export type UpdateVariables = { id: number } & Omit<
  components['schemas']['ActivityPostRequestDTO'],
  'image'
> & {
  image?: File;
};

export const useUpdateActivityPostMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (variables: UpdateVariables) => {
      const { id, ...data } = variables;
      const formData = new FormData();

      // Safely iterate over the data and append to FormData
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = data[key as keyof typeof data];

          if (value instanceof File) {
            formData.append(key, value);
          } else if (Array.isArray(value)) {
            // Handle array fields like 'supports' by appending '[]' to the key
            value.forEach(item => formData.append(`${key}[]`, String(item)));
          } else if (value != null) {
            formData.append(key, String(value));
          }
        }
      }

      // The openapi-fetch client's static types expect a plain object matching the schema.
      // However, to correctly send multipart/form-data, we must pass a FormData object as the body.
      // This requires a type assertion to bridge the static type and the runtime requirement.
      return client.PATCH('/posts/{id}', {
        params: { path: { id } },
        body: formData as unknown as components['schemas']['ActivityPostRequestDTO'],
      });
    },
    onSuccess: (data, variables) => {
      showToast('게시물이 수정되었습니다.', 'success');
      queryClient.invalidateQueries({ queryKey: ['activityPost', variables.id] });
    },
    onError: (err: Error) => {
      showToast(err.message || '수정에 실패했습니다.', 'error');
    },
  });
};