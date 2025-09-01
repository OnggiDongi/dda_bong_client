'use client';

import Image from 'next/image';
import Txt from '@/components/atoms/Text';

interface VipBenefitCardProps {
  benefitText: string;
  imageSrc: string;
}

export default function VipBenefitCard({
  benefitText,
  imageSrc,
}: VipBenefitCardProps) {
  return (
    <div className='relative w-full'>
      {/* 왼쪽 아래 이미지 */}
      <div className='absolute left-0 pt-[77px] pl-[39px]'>
        <Image src={imageSrc} alt='Benefit Image' width={170} height={170} />
      </div>

      {/* 오른쪽 위 아이콘과 텍스트 */}
      <div className='absolute right-0 pt-[27px] pr-5'>
        <div className='relative flex items-center justify-center'>
          <Image
            src='/icons/ic_textballoon.svg'
            alt='Place Icon'
            width={152}
            height={155}
          />
          <Txt className='text-Logo-Mint absolute pl-5 text-lg'>
            {benefitText}
          </Txt>
        </div>
      </div>
    </div>
  );
}
