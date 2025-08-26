import MangageVolunteer from '@/components/admin/home/ManageVolunteer';
import RecruitVolunteer from '@/components/admin/home/RecruitVolunteer';
import RegisterVolunteer from '@/components/admin/home/RegisterVolunteer';
import CarouselBanner from '@/components/home/CarouselBanner';
import Header from '@/components/home/Header';
import ProfileCard from '@/components/home/ProfileCard';

export default function AdimHomePage() {
  return (
    <main className='bg-Page-Background mx-auto flex flex-col items-center gap-4 px-5 pt-5 pb-20'>
      <Header />

      <ProfileCard
        username={'마포구청'}
        tier={'Silver'}
        totalHours={72}
      ></ProfileCard>

      <div className='flex flex-row gap-2.5'>
        <RecruitVolunteer />
        <MangageVolunteer />
      </div>

      <RegisterVolunteer />
      <CarouselBanner />
    </main>
  );
}
