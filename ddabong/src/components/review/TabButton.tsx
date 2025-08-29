'use client';

import { cn } from '@/lib/utils';
import Button from '@/components/atoms/Button';

type Tab = 'apply' | 'history';

interface Props {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export default function TabButton({ activeTab, onChange }: Props) {
  return (
    <div className='flex items-center justify-center gap-5'>
      <Button
        onClick={() => onChange('apply')}
        className={cn(
          'h-[45px] w-[165px]',
          activeTab === 'apply' ? '' : 'bg-1Q-Mint-Line'
        )}
        textClassName={cn(
          activeTab === 'apply' ? 'text-white' : 'text-Logo-Mint'
        )}
      >
        신청내역
      </Button>

      <Button
        onClick={() => onChange('history')}
        className={cn(
          'h-[45px] w-[165px]',
          activeTab === 'history' ? '' : 'bg-1Q-Mint-Line'
        )}
        textClassName={cn(
          activeTab === 'history' ? 'text-white' : 'text-Logo-Mint'
        )}
      >
        지난내역
      </Button>
    </div>
  );
}
