import ApplyBanner from '@/components/home/ApplyBanner';
import CarouselBanner from '@/components/home/CarouselBanner';
import CertificatesSection from '@/components/home/CertificatesSection';
import Header from '@/components/home/Header';
import ProfileCard from '@/components/home/ProfileCard';

export default function HomePage() {
  return (
    <main className='flex flex-col items-center gap-4 px-5 pt-5'>
      <Header />

      <ProfileCard
        username={'별돌이군'}
        tier={'Silver'}
        totalHours={72}
      ></ProfileCard>

      <ApplyBanner />
      <CarouselBanner></CarouselBanner>
      <CertificatesSection />
    </main>
  );
}
