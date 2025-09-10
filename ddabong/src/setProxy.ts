import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const target = process.env.NEXT_PUBLIC_API_URL;

export default function setupProxy(app: Express) {
  app.use(
    '/',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
    })
  );
}
