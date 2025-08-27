'use client';

import { useState } from 'react';
import CategoryButton from './CategoryButton';

const categories = ['생활', '교육', '보건', '문화', '환경', '행정', '농어촌'];

export default function CategoryController() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev);

      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }

      return next;
    });
  };

  return (
    <section className='flex flex-wrap justify-center gap-2'>
      {categories.map((c) => (
        <CategoryButton
          key={c}
          label={c}
          active={selected.has(c)}
          onClick={() => toggle(c)}
        />
      ))}
    </section>
  );
}
