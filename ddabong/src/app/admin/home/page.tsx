import AdminProfile from '@/components/admin/home/AdminProfile';
import ManageVolunteer from '@/components/admin/home/ManageVolunteer';
import RecruitVolunteer from '@/components/admin/home/RecruitVolunteer';
import RegisterVolunteer from '@/components/admin/home/RegisterVolunteer';
import CarouselBanner from '@/components/home/CarouselBanner';
import Header from '@/components/home/Header';

export default function AdminHomePage() {
  return (
    <main className='bg-Page-Background mx-auto flex flex-col items-center gap-4 px-5 pt-5 pb-6'>
      <Header />
      <AdminProfile username={'마포구청'}></AdminProfile>
      <div className='flex w-full flex-row items-center justify-center gap-2.5'>
        <RecruitVolunteer />
        <ManageVolunteer />
      </div>

      <RegisterVolunteer />
      <CarouselBanner />
    </main>
  );
}
