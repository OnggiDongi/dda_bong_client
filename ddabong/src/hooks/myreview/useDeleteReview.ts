import { components } from '@/types/openapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type MyReview = components['schemas']['ActivityMyReviewResponseDTO'];

export function useDeleteReview() {
  const qc = useQueryClient();

  return useMutation<number, Error, number, { prev?: MyReview[] }>({
    mutationFn: async (id: number) => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/activity/myreview/${id}`,
        {
          method: 'DELETE',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      if (!res.ok) {
        const msg = await res.text().catch(() => '');
        throw new Error(`삭제 실패: ${res.status} ${msg}`);
      }
      return id;
    },

    // 낙관적 업데이트
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['myreview'] });

      const prev = qc.getQueryData<MyReview[]>(['myreview']);
      qc.setQueryData<MyReview[]>(['myreview'], (old) =>
        (old ?? []).filter((r) => (r?.id ?? -1) !== id)
      );

      return { prev };
    },

    // 실패 시 롤백
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData<MyReview[]>(['myreview'], ctx.prev);
    },

    // 최종 동기화
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['myreview'] });
    },
  });
}
