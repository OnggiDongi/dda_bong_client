'use client';

import { useState, useEffect } from 'react';
import WishCard from '@/components/wish/WishCard';
import Txt from '../atoms/Text';
import { privateClient } from '@/lib/openapi-client';
import { components } from '@/types/openapi';

type WishItem = components['schemas']['ActivityPostResponseDTO'];

export default function WishList() {
  const [wishlist, setWishlist] = useState<WishItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWishes = async () => {
      setIsLoading(true);
      const { data, error } = await privateClient.GET('/users/likes');
      if (error) {
        console.error('Failed to fetch wishes:', error);
        setWishlist([]);
      } else {
        setWishlist(data as WishItem[]);
      }
      setIsLoading(false);
    };

    getWishes();
  }, []);

  const handleToggleWish = async (id: number) => {
    const originalWishlist = [...wishlist];
    const itemToToggle = wishlist.find((item) => item.id === id);

    // Optimistic UI update
    setWishlist((prev) => prev.filter((item) => item.id !== id));

    const { error } = await privateClient.POST('/posts/{activityPostId}/like', {
      params: {
        path: {
          activityPostId: id,
        },
      },
    });

    if (error) {
      console.error('Failed to toggle wish status:', error);
      // Revert UI on error
      setWishlist(originalWishlist);
      // Optionally, show a toast or notification to the user
    } else {
      console.log(`Item ${id} like status toggled on server.`);
    }
  };

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
          onToggleWish={() => handleToggleWish(item.id!)}
        />
      ))}
    </section>
  );
}