// lib/openapi-client.ts
import type { paths } from '@/types/openapi';
import createClient, { type Client, type Middleware } from 'openapi-fetch';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const publicClient: Client<paths> = createClient<paths>({ baseUrl });
export const privateClient: Client<paths> = createClient<paths>({ baseUrl });

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
        request.headers.set('ngrok-skip-browser-warning', 'true');
      }
    }
    return request;
  },
  async onResponse({ response, request }) {
    if (response.status === 401 && typeof window !== 'undefined') {
      // to prevent infinite loop
      if (request.headers.get('X-Retry')) {
        return response;
      }

      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const refreshResponse = await fetch(`${baseUrl}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        console.log(refreshResponse);

        if (!refreshResponse.ok) {
          console.log('1');
          return response;
        }

        const newAccessToken = refreshResponse.headers
          .get('Authorization')
          ?.split(' ')[1];

        console.log(refreshResponse.headers);
        if (!newAccessToken) {
          console.log('2');
          return response;
        }

        console.log(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);

        const newHeaders = new Headers(request.headers);
        newHeaders.set('Authorization', `Bearer ${newAccessToken}`);
        newHeaders.set('X-Retry', 'true');

        // Clone the request to reuse the body
        const newRequest = new Request(request.url, {
          method: request.method,
          headers: newHeaders,
          // Only add body if it's not a GET or HEAD request
          body:
            request.method !== 'GET' && request.method !== 'HEAD'
              ? await request.clone().blob()
              : undefined,
        });

        return fetch(newRequest);
      } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('accessToken');
        return response;
      }
    }
    return response;
  },
};

privateClient.use(authMiddleware);
