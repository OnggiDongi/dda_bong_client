'use client';

import { useInstitutionSummary } from '@/hooks/admin/home/adminprofile';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AdminProfile from '@/components/admin/home/AdminProfile';
import ManageVolunteer from '@/components/admin/home/ManageVolunteer';
import RecruitVolunteer from '@/components/admin/home/RecruitVolunteer';
import RegisterVolunteer from '@/components/admin/home/RegisterVolunteer';
import CarouselBanner from '@/components/home/CarouselBanner';
import Header from '@/components/home/Header';

export default function AdminHomePage() {
  const { data: institution, isLoading, error } = useInstitutionSummary();

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Image
          src='/video/loading.gif'
          alt='로딩 중'
          width={130}
          height={130}
          unoptimized
        />
      </div>
    );
  }

  if (error) {
    return (
      <p className='text-Logo-Pink mt-20 text-center'>오류가 발생했습니다.</p>
    );
  }

  const username = institution?.name ?? '기관명';

  return (
    <main className='flex flex-col items-center gap-6 px-5 pt-5'>
      <Header />
      <AdminProfile username={username} />
      <div className='flex flex-row items-center justify-center gap-2.5'>
        <RecruitVolunteer />
        <ManageVolunteer />
      </div>
      <RegisterVolunteer />
      <CarouselBanner />
    </main>
  );
}
