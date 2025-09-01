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

// 디자인 확인용 목업 데이터
const mockWishData: WishItem[] = [
  {
    id: 1,
    imageUrl: '/images/test1.png',
    category: '환경',
    title: '어르신과 함께하는 즐거운 시간',
    endAt: '2025.10.05',
    location: '알파코.',
  },
  {
    id: 2,
    imageUrl: '/images/test2.png',
    category: '농어촌',
    title: '우리 동네 깨끗하게 만들기',
    endAt: '2025.10.12',
    location: '주말 아침, ',
  },
  {
    id: 3,
    imageUrl: '/images/test3.png',
    category: '교육',
    title: '초등학생 방과 후 학습 지도',
    endAt: '2025.10.15',
    location: '서울시 마포구',
  },
];

// API호출
const fetchWishes = async (token: string | null): Promise<WishItem[]> => {
  if (!token) {
    // 로그인하지 않은 경우, 개발 환경 전용 목업데이타 !!
    if (process.env.NODE_ENV === 'development') {
      return mockWishData;
    }
    return [];
  }

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
    // API 호출 실패 시, 개발 환경일 때만 목업 데이터를 보여줌
    if (process.env.NODE_ENV === 'development') {
      return mockWishData;
    }
    return []; // 프로덕션 환경에서는 빈 배열 반환
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
    // TODO: API 호출로 서버에 찜 해제 상태를 업데이트해야 합니다.
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios
        .delete(`http://localhost:8080/users/likes/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .catch((error) => console.error('Failed to delete wish:', error));
    }
    console.log(`Item ${id} removed from wishlist.`);
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
        />
      ))}
    </section>
  );
}
