import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: Express) {
  app.use(
    '/',
    createProxyMiddleware({
      target: `http://${process.env.NEXT_PUBLIC_API_URL}`,
      changeOrigin: true,
    })
  );
}
