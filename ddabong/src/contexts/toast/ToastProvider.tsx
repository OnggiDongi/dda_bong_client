'use client';

import Image from 'next/image';
import { useState, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import Txt from '@/components/atoms/Text';
import { ToastContext } from './ToastContext';

type Props = {
  className?: string;
};

// toast 타입 정의
type ToastType = 'success' | 'error';

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
  const [type, setType] = useState<ToastType>('success');

  const showToast = (
    msg: string,
    toastType: ToastType = 'success',
    customPosition?: string
  ) => {
    setMessage(msg);
    setType(toastType);
    if (customPosition) setPosition(customPosition);

    setIsAnimating(true);
    setIsVisible(true);

    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 150);
    }, 2000);
  };

  // 아이콘 경로 매핑
  const getIconSrc = () => {
    switch (type) {
      case 'error':
        return '/icons/ic_error.svg';
      case 'success':
      default:
        return '/icons/ic_check.svg';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && (
        <div
          className={cn(
            'fixed top-7/9 left-1/2 z-[1000] -translate-x-1/2 transform transition-all duration-150',
            position,
            isAnimating
              ? 'translate-y-0 opacity-100'
              : '-translate-y-2 opacity-0'
          )}
        >
          {/* Toast UI */}
          <div className='bg-Hana-Black bg-opacity-90 flex min-w-fit items-center gap-3 rounded-[25px] px-5 py-2 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]'>
            <Image
              src={getIconSrc()}
              alt={type}
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
