'use client';

import { useInstitutionSummary } from '@/hooks/admin/home/adminprofile';
import AdminProfile from '@/components/admin/home/AdminProfile';
import ManageVolunteer from '@/components/admin/home/ManageVolunteer';
import RecruitVolunteer from '@/components/admin/home/RecruitVolunteer';
import RegisterVolunteer from '@/components/admin/home/RegisterVolunteer';
import CarouselBanner from '@/components/home/CarouselBanner';
import Header from '@/components/home/Header';

export default function AdminHomePage() {
  const { data: institution, isLoading, error } = useInstitutionSummary();
  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>오류가 발생했습니다.</p>;
  }
  const username = institution?.name ?? '기관명';
  return (
    <main className='flex flex-col items-center gap-6 px-5 pt-5'>
      <Header />
      <AdminProfile username={username}></AdminProfile>
      <div className='flex flex-row items-center justify-center gap-2.5'>
        <RecruitVolunteer />
        <ManageVolunteer />
      </div>
      <RegisterVolunteer />
      <CarouselBanner />
    </main>
  );
}
