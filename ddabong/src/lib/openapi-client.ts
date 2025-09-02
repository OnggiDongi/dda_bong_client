import type { paths } from '@/types/openapi';
import createClient, { type Client, type Middleware } from 'openapi-fetch';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const publicClient: Client<paths> = createClient<paths>({ baseUrl });
export const privateClient: Client<paths> = createClient<paths>({ baseUrl });

// JWT 토큰 자동 첨부 (클라이언트 전용)
const authMiddleware: Middleware = {
  async onRequest({ request }) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return request; // 중요: Request 또는 Response 또는 undefined를 반환
  },
  // 필요하면 401 처리/재시도는 onResponse/onError에서
  // async onResponse({ response }) { ... }
  // async onError({ error }) { ... }
};

privateClient.use(authMiddleware);
