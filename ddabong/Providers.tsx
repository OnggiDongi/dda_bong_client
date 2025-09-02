'use client';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { useEffect, useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => new QueryClient());

  // (선택) 새로고침해도 캐시 유지
  useEffect(() => {
    const persister = createSyncStoragePersister({
      storage: window.localStorage,
    });
    persistQueryClient({
      queryClient: qc,
      persister,
      maxAge: 1000 * 60 * 5, // 5분
    });
  }, [qc]);

  return (
    <QueryClientProvider client={qc}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
