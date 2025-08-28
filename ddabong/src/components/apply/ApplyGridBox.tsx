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
      <div className='bg-Background h-[55px] w-[55px] rounded-[10px] p-[13px]'>
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
          <Txt key={idx} className='text-Hana-Black/60 text-[15px]'>
            {line}
          </Txt>
        ))}
      </div>
    </div>
  );
}
