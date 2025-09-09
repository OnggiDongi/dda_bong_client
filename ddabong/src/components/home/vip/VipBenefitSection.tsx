'use client';

import Txt from '@/components/atoms/Text';

export default function VipBenefitSection() {
  const benefits = [
    '하나더넥스트 연금세미나 우선 참여권',
    '금융 전문가 1:1 상담 (가족 간 양도 가능)',
    '대출·부동산 상담 우선권 (가족 공통 이용 가능)',
    '일반 국가검진에 없는 항목 지원',
  ];

  return (
    <section className='pt-[23px]'>
      <div>
        <Txt weight='bold' className='pl-[16px] text-2xl'>
          VIP 등급 혜택
        </Txt>
      </div>
      <Txt className='text-Modal-font pl-[19px] text-lg underline underline-offset-4'>
        * 최근 6개월 간 누적 봉사 111시간 달성 시
      </Txt>

      <ul className='list pt-[17px] pl-6'>
        {benefits.map((benefit, i) => (
          <li key={i}>
            <Txt className='text-lg'>{benefit}</Txt>
          </li>
        ))}
      </ul>
    </section>
  );
}
