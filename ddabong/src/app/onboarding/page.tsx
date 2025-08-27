import Image from 'next/image';
import Txt from '@/components/atoms/Text';
import AdminCard from '@/components/onboarding/AdminCard';
import SeniorCard from '@/components/onboarding/SeniorCard';

export default function OnboardingPage() {
  return (
    <main className='bg-Page-Background flex min-h-screen flex-col items-center gap-5 pt-25'>
      <Image
        src='/icons/ic_logo.svg'
        alt='따봉 로고'
        width={150}
        height={90}
        className='mt-[18px] object-contain'
        priority
      />
      <Txt weight='bold' className='text-Modal-font -mt-6 pb-9 text-xl'>
        당신의 따봉 하나, 세상에 온기 하나
      </Txt>

      <AdminCard />
      <SeniorCard />
    </main>
  );
}
