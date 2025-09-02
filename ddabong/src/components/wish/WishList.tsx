'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import WishCard from '@/components/wish/WishCard';
import Txt from '../atoms/Text';
import { privateClient } from '@/lib/openapi-client';
import { components } from '@/types/openapi';

type WishItem = components['schemas']['ActivityPostResponseDTO'];

// API 호출 함수들을 분리하여 정의
const fetchWishes = async () => {
  const { data, error } = await privateClient.GET('/users/likes');
  if (error) {
    throw new Error('Failed to fetch wishes');
  }
  return data as WishItem[];
};

const toggleWish = async (id: number) => {
  const { error } = await privateClient.POST('/posts/{activityPostId}/like', {
    params: {
      path: {
        activityPostId: id,
      },
    },
  });
  if (error) {
    throw new Error('Failed to toggle wish status');
  }
};

export default function WishList() {
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery<WishItem[]>({
    queryKey: ['wishlist'],
    queryFn: fetchWishes,
  });

  const { mutate: toggleWishMutation } = useMutation({
    mutationFn: toggleWish,
    onMutate: async (id: number) => {
      // 쿼리 취소 (덮어쓰기 방지)
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });

      // 이전 데이터 스냅샷
      const previousWishlist = queryClient.getQueryData<WishItem[]>(['wishlist']);

      // 낙관적 업데이트
      queryClient.setQueryData<WishItem[]>(
        ['wishlist'],
        (old) => old?.filter((item) => item.id !== id) ?? [],
      );

      // 컨텍스트에 이전 데이터 반환
      return { previousWishlist };
    },
    onError: (err, id, context) => {
      console.error('Failed to toggle wish status:', err);
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousWishlist) {
        queryClient.setQueryData(['wishlist'], context.previousWishlist);
      }
    },
    onSettled: () => {
      // 성공/실패 여부와 관계없이 쿼리 무효화하여 서버와 상태 동기화
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  if (isLoading) {
    return (
      <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center text-center'>
        <Txt className='text-2xl'>찜한 봉사활동을 불러오는 중...</Txt>
      </div>
    );
  }

  return wishlist.length === 0 ? (
    <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center text-center'>
      <Txt className='text-2xl'>찜한 봉사활동이 없습니다.</Txt>
      <Txt className='text-Icon-Detail pt-2 text-sm'>
        관심 있는 봉사활동을 찜해보세요.
      </Txt>
    </div>
  ) : (
    <section className='flex flex-col gap-4 px-[26px] pt-5'>
      {wishlist.map((item) => (
        <WishCard
          key={item.id}
          id={item.id!}
          imageUrl={item.imageUrl!}
          category={item.category!}
          title={item.title!}
          endAt={item.endAt!}
          location={item.location!}
          isWished={true}
          onToggleWish={() => toggleWishMutation(item.id!)}
        />
      ))}
    </section>
  );
}
