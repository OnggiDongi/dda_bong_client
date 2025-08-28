'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Txt from '@/components/atoms/Text';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

type Slide = {
  titleTop?: string;
  titleBottom: string;
  href: string;
  imgSrc: string;
  imgAlt?: string;
};

const slides: Slide[] = [
  {
    titleBottom: '뭐 하는 곳인가요?',
    href: '/home/about',
    imgSrc: '/icons/ic_flyingStar.svg',
  },
  {
    titleTop: '봉사시간 채우고',
    titleBottom: 'VIP 라운지 이용하자!',
    href: '/home/vip',
    imgSrc: '/icons/ic_coinHeart.svg',
  },
];

export default function CarouselBanner() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className='h-[170px] w-[350px]'>
      <Carousel setApi={setApi} className='size-full'>
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={i}>
              <Link
                href={s.href}
                className='border-Background block rounded-[20px] border bg-white px-6 py-5'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex flex-col'>
                    {s.titleTop ? (
                      <Txt weight='bold' className='text-Hana-Black text-2xl'>
                        {s.titleTop}
                      </Txt>
                    ) : (
                      <Image
                        src='/icons/ic_logo.svg'
                        alt='따봉 로고'
                        width={70}
                        height={26}
                      />
                    )}
                    <Txt
                      weight='bold'
                      className='text-Hana-Black pt-1 text-2xl'
                    >
                      {s.titleBottom}
                    </Txt>
                  </div>
                  <Image
                    src={s.imgSrc}
                    alt={s.imgAlt ?? 'banner image'}
                    width={90}
                    height={100}
                    priority
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='absolute top-[83%] left-1/2 flex -translate-x-1/2 items-center gap-3'>
          <CarouselPrevious />
          <div className='rounded-full bg-white/95 px-3 py-1 text-base shadow'>
            {index + 1}/{slides.length}
          </div>
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
