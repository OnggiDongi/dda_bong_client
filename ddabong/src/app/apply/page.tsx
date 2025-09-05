'use client';

import { components } from '@/types/openapi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { privateClient } from '@/lib/openapi-client';
import CategoryController from '@/components/apply/CategoryController';
import LocationSelect from '@/components/apply/LocationSelect';
import VolunteerCard from '@/components/apply/VolunteerCard';
import VolunteerHeader from '@/components/apply/VolunteerHeader';
import Txt from '@/components/atoms/Text';
import TopBar from '@/components/atoms/TopBar';

type Activity = components['schemas']['ActivityPostResponseDTO'];
type CustomError = {
  error: string;
};

const fetchActivities = async (region?: string, categories?: string) => {
  const { data, error } = await privateClient.GET('/posts', {
    params: {
      query: {
        searchRegion: region,
        categories: categories,
      },
    },
  });

  if (error) {
    // The error now includes the response body, so we can inspect it
    const errorBody = error as CustomError;
    if (errorBody?.error === 'ERROR_ACCESS_TOKEN') {
      // Specific handling for auth error if needed, e.g., redirect to login
      console.error('Authentication error: Please log in.');
    }
    throw new Error('Failed to fetch activities');
  }

  // Handle different possible response structures robustly
  if (!data) return [];
  if (Array.isArray(data)) return data as Activity[];

  console.warn('Unexpected API response structure:', data);
  return []; // Return empty array if structure is unknown
};

export default function ApplyPage() {
  const [region, setRegion] = useState<string | undefined>(undefined);
  const [district, setDistrict] = useState<string | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleCategoryToggle = (label: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const searchRegion = district ? `${region} ${district}` : region;
  const categories = Array.from(selectedCategories).join(',');

  const {
    data: activities = [],
    isLoading,
    isError,
  } = useQuery<Activity[]>({
    queryKey: ['activities', searchRegion, categories],
    queryFn: () => fetchActivities(searchRegion, categories),
    // Keep previous data while refetching for a smoother UX
    placeholderData: (previousData) => previousData,
  });

  return (
    <main className='bg-page-gradient'>
      <TopBar title='' bgColor='bg-page-background' />
      <div className='flex flex-col gap-5 px-4'>
        <VolunteerHeader />
        <LocationSelect
          region={region}
          district={district}
          onRegionChange={setRegion}
          onDistrictChange={setDistrict}
        />
        <CategoryController
          selected={selectedCategories}
          onToggle={handleCategoryToggle}
        />
        <section className='flex flex-col gap-4'>
          {isLoading ? (
            <div className='mt-40 flex items-center justify-center'>
              <Image
                src='/video/loading.gif'
                alt='로딩 중'
                width={130}
                height={130}
                unoptimized
              />
            </div>
          ) : isError ? (
            <Txt className='text-center text-red-500'>
              봉사활동 목록을 불러오는 데 실패했습니다. 로그인 정보를
              확인해주세요.
            </Txt>
          ) : activities.length === 0 ? (
            <Txt className='text-center'>해당 조건의 봉사활동이 없습니다.</Txt>
          ) : (
            activities.map((item) => (
              <VolunteerCard
                key={item.id}
                id={item.id!}
                category={item.category!}
                deadline={item.dday!}
                title={item.title!}
                date={item.endAt!}
                location={item.location!}
                image={item.imageUrl!}
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
}
