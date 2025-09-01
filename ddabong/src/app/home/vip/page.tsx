import TopBar from '@/components/atoms/TopBar';
import VipBenefitCard from '@/components/home/vip/VipBenefitCard';
import VipBenefitSection from '@/components/home/vip/VipBenefitSection';
import VipLevelCard from '@/components/home/vip/VipLevelCard';

export default function VipPage() {
  return (
    <div className='bg-page-gradient flex h-screen w-full flex-col'>
      <TopBar title='나의 등급' bgColor='bg-page-background' />
      <div className='flex-1 overflow-y-auto px-[26px] pt-[23px]'>
        <VipLevelCard userName='시별돌' totalHours={69} />
        <div className='border-Box-Line border-b pb-[269px]'>
          <VipBenefitCard
            benefitText='봉사 50시간마다 새로운 인증서를 발급해 드립니다 !'
            imageSrc='/icons/ic_flyingStar.svg'
          />
        </div>
        <VipBenefitSection />
      </div>
    </div>
  );
}
