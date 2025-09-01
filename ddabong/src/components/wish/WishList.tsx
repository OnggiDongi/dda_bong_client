'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import WishCard from '@/components/wish/WishCard';
import Txt from '../atoms/Text';

// 찜 목록 아이템의 타입 정의 (실제 API 응답에 맞춰 수정 필요)
interface WishItem {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  endAt: string;
  location: string;
}

// API호출
const fetchWishes = async (token: string | null): Promise<WishItem[]> => {
  try {
    const response = await axios.get<WishItem[]>(
      'http://localhost:8080/users/likes',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Failed to fetch wishes:', error);
    return [];
  }
};

export default function WishList() {
  const [wishlist, setWishlist] = useState<WishItem[]>([]);

  useEffect(() => {
    const getWishes = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const data = await fetchWishes(accessToken);
      setWishlist(data);
    };

    getWishes();
  }, []);

  const handleToggleWish = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('Not logged in. Mock item removed from UI.');
      return;
    }

    axios
      .post(`http://localhost:8080/posts/${id}/like`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        console.log(`Item ${id} like status toggled on server.`);
      })
      .catch((error) => {
        console.error('Failed to toggle wish status:', error);
      });
  };

  return wishlist.length === 0 ? (
    <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center text-center'>
      <Txt className='text-2xl'>찜한 봉사활동이 없습니다.</Txt>
      <Txt className='text-Icon-Detail pt-2 text-sm'>
        관심 있는 봉사활동을 찜해보세요.
      </Txt>
    </div>
  ) : (
    <section className='flex flex-col gap-4 px-[26px]'>
      {wishlist.map((item) => (
        <WishCard
          key={item.id}
          id={item.id}
          imageUrl={item.imageUrl}
          category={item.category}
          title={item.title}
          endAt={item.endAt}
          location={item.location}
          isWished={true}
          onToggleWish={handleToggleWish}
        />
      ))}
    </section>
  );
}
