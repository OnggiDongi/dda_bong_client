import Image from 'next/image';
import { useState, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import Txt from '@/components/atoms/Text';
import { ToastContext } from './ToastContext';

type Props = {
  className?: string;
};

/**
 * ToastProvider는 ToastContext를 제공하는 컴포넌트
 */
export function ToastProvider({
  children,
  className,
}: PropsWithChildren<Props>) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState(className);
  const [isAnimating, setIsAnimating] = useState(false);

  const showToast = (msg: string, customPosition?: string) => {
    setMessage(msg);
    if (customPosition) setPosition(customPosition);

    setIsAnimating(true);
    setIsVisible(true);

    // 애니메이션 → 잠깐 보였다가 사라지도록
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 150);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && (
        <div
          className={cn(
            'fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 transform transition-all duration-150',
            position,
            isAnimating
              ? 'translate-y-0 opacity-100'
              : '-translate-y-2 opacity-0'
          )}
        >
          {/* Toast UI */}
          <div className='bg-Hana-Black flex min-w-fit items-center gap-3 rounded-[6px] px-5 py-2 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]'>
            <Image
              src='/icons/ic_check.svg'
              alt='success'
              width={22}
              height={22}
              className='flex-shrink-0'
            />
            <Txt
              size={18}
              weight='semibold'
              className='whitespace-nowrap text-white'
            >
              {message}
            </Txt>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
