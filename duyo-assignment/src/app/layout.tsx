import type {Metadata} from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '권기범 Duyo Assignment',
  description: '권기범 Duyo Assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='kr'
      className={`${pretendard.variable}`}>
      <body
        className={`${pretendard.className} antialiased bg-[#f2f3f5] h-screen overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
