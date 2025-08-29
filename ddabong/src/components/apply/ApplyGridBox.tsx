import Image from 'next/image';
import Txt from '../atoms/Text';

type InfoItemProps = {
  iconSrc: string;
  iconAlt: string;
  lines: string[];
};

export default function ApplyGridBox({
  iconSrc,
  iconAlt,
  lines,
}: InfoItemProps) {
  return (
    <div className='flex gap-2'>
      {/* 아이콘 박스 */}
      <div className='bg-Background h-[48px] w-[48px] rounded-xl p-[12px]'>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={0}
          height={0}
          className='h-full w-full object-contain'
        />
      </div>

      {/* 텍스트 영역 */}
      <div className='flex flex-col justify-center'>
        {lines.map((line, idx) => (
          <Txt key={idx} className='text-Hana-Black/60 text-[17px]'>
            {line}
          </Txt>
        ))}
      </div>
    </div>
  );
}
