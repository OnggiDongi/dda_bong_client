import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DDABONG 따봉',
  description: '당신의 따봉 하나, 세상에 온기 하나',
  icons: { icon: '/icons/ic_senior_bigface.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='flex h-screen items-center justify-center overflow-hidden antialiased'>
        <main className='bg-Background h-full w-full overflow-y-auto pb-25 shadow-[0_0_10px_rgba(0,0,0,0.3)] sm:max-w-sm [&::-webkit-scrollbar]:hidden'>
          {children}
        </main>
      </body>
    </html>
  );
}
