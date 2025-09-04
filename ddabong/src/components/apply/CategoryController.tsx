'use client';

import CategoryButton from './CategoryButton';

const CATEGORY_MAP = {
  생활: 'LIVING',
  교육: 'EDUCATION',
  보건: 'SAFETY',
  문화: 'CULTURE',
  환경: 'ENVIRONMENT',
  행정: 'PUBLIC',
  농어촌: 'RURALAREA',
} as const;

interface CategoryControllerProps {
  selected: Set<string>;
  onToggle: (value: string) => void;
}

export default function CategoryController({
  selected,
  onToggle,
}: CategoryControllerProps) {
  return (
    <section className='flex flex-wrap justify-center gap-2'>
      {Object.entries(CATEGORY_MAP).map(([key, value]) => (
        <CategoryButton
          key={key}
          label={key}
          active={selected.has(value)}
          onClick={() => onToggle(value)}
        />
      ))}
    </section>
  );
}
